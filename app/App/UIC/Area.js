/** @jsx React.DOM */
goog.provide('App.UIC.Area');
goog.require('App.UIC.Model');
goog.require('App.UIC.Association');
goog.require('App.UIC.Panel');
App.UIC.Area = React.createClass({displayName: 'Area',
  /**
  * props types
  */
  propTypes: {
    model_drop: React.PropTypes.func,            //what happens when a model is dropped into the area
    models: React.PropTypes.func,               //array of models registered
    associations: React.PropTypes.func,         //array of associations registered
    model_resize: React.PropTypes.func,          //what happens when a model is resized (bubles to model)
    property_remove: React.PropTypes.func,       //removes property from a model
    add_model: React.PropTypes.func,             //adds model to the collection
    model_property_types: React.PropTypes.array, //array of models which can be used a a new property type
    remove_model: React.PropTypes.func,          //removes a specified model
    has_relations: React.PropTypes.func,         //checks if the passed model has relations or not
    to_json: React.PropTypes.func,               //returns everything in the json format
    update_associations_of_model: React.PropTypes.func,
    add_property_to_model: React.PropTypes.func,
    add_endpoint_to_model: React.PropTypes.func
  },
  /**
  * default props
  */
  getDefaultProps: function(){
    return {
      model_drop: function(){console.log('no action specified');},
      models: function(){console.log('no action specified')},
      associations: function(){console.log('no action specified')},
      model_property_types: [],
      model_resize: function(){console.log('no action specified');},
      property_remove: function(){console.log('no action specified');},
      add_model: function(){console.log('no action specified')},
      remove_model: function(){console.log('no action specified')},
      has_relations: function(){console.log('no action specified')},
      to_json: function(){console.log('no action specified')},
      update_associations_of_model: function(){console.log('no action specfied')},
      add_property_to_model: function(){console.log('no action specified')},
      add_endpoint_to_model: function(){console.log('no action specified')}
    };
  },
  /**
  * setups the initial state
  */
  getInitialState: function(){
    return {models: [], associations: [], init_rendering: true};
  },

  /**
  * TODO: reload the assoc when models rendered
  */
  componentDidMount: function(){
    console.log('--- area mounted ---');
    this.setState({
      models: this.props.models()
    });
  },

  /**
  * function specifies when the component should update. In this case we do
  * not want to update the component when there has been a change in rendered_models
  * property, because this state value indicates that the models are being
  * initialy rendered. In that case we do not want to re-render all the models
  * when a model just got rendered.
  */
  shouldComponentUpdate: function(next_props, next_state){
    return true;
  },

  /**
  * reload models
  */
  reload_data: function(){
    this.setState({
      models: this.props.models(),
      associations: this.props.associations()
    });
  },

  /**
  * This function is called when a model is mounted. It used for counting,
  * how many of the models has been initially loaded and if all of them,
  * then the associations are being updated and set as a state so they can be
  * drawn
  */
  model_rendered: function(id){
    if(id === this.state.models[this.state.models.length-1].id){
      console.log('last one');
      this.reload_data();
    }
  },

  /**
  * When a model is dropped
  * maybe it would be possible to call the model_drop function directly
  * if i would preventDefault there.
  */
  dropped: function(e){
    e.preventDefault();
    var dropped_model_id = e.dataTransfer.getData('application/json');
    var drag_info = JSON.parse(dropped_model_id);
    var new_coords = this.props.model_drop(drag_info,{"x" : e.clientX, "y" : e.clientY});
    this.update_associations_of_model(drag_info.id);
    this.reload_data();
  },

  /**
  * function loops over all models and returns an array of models just with
  * name an ID.
  * This is used in properties, because a model can by also a property type.
  * In that case, we want to draw an association.
  */
  get_model_names_as_array: function(){
    var to_be_returned = [];
    for(var i = 0; i < this.state.models.length; i++){
      var model = this.state.models[i];
      to_be_returned.push({name: model.name, id: model.id});
    }
    return to_be_returned;
  },

  /**
  * function updates associations of the passed model. It receives the id and
  * the new recalculated style of the associations which has be altered.
  * then it finds the assocs in the state property based on the id and updates its styles
  * @param {String} model_id
  */
  update_associations_of_model: function(model_id){
    var rels = this.props.update_associations_of_model(model_id);
    this.reload_data();
  },

  /**
  * function takes id of an association and removes it for the state
  * @param {assoc_id} id of the association to be removed
  */
  remove_association: function(assoc_id){
    var new_assocs = this.state.associations;
    for(var i = 0; i < this.state.associations.length; i++){
      if(this.state.associations[i].id === assoc_id){
        new_assocs.splice(i,1);
      }
    }
    this.setState({associations: new_assocs});
  },

  /**
  * the function gets data from the wizard and tries to add a new model in the
  * data model. If it happens, the model is also added to the state variable
  * @param {object} model to be added to the state
  */
  register_new_model: function(form_data){
    var new_elements = this.props.add_model(form_data);
    this.reload_data();
  },

  /**
  * This method needs to be stated in order to make onDrop work
  */
  dragedOver: function(e){
    e.preventDefault();
  },

  /**
  * This method needs to be stated in order to make onDrop work
  */
  dragLeave: function(e){
    e.preventDefault();
  },

  /**
  * function removes model from the UI and collection
  */
  remove_model: function(model_id){
    //check if the model has relations and delete it only if not
    if(!this.props.has_relations(model_id)){
      this.props.remove_model(model_id);
      this.reload_data();
    }
    else alert('this model has relations! Delete the property creating the relations first');
  },

  /**
  * renders the component
  */
  render: function() {
    console.log('---- rendering Area ----');
    var models_html = [];
    if(this.state.models.length > 0){
      var that = this;
      this.state.models.forEach(function(model){
        models_html.push(App.UIC.Model({name: model.name, 
                                        renamed: model.renamed, 
                                        styles: model.styles, 
                                        id: model.id, 
                                        key: model.id, 
                                        resized: this.props.model_resize, 
                                        property_remove: this.props.property_remove, 
                                        endpoints: model.endpoints, 
                                        remove_endpoint: model.remove_endpoint, 
                                        remove_model: that.remove_model, 
                                        remove_association: that.remove_association, 
                                        model_rendered: that.model_rendered, 
                                        update_associations_of_model: that.update_associations_of_model, 
                                        model_property_types: this.get_model_names_as_array(), 
                                        add_property_to_model: this.props.add_property_to_model, 
                                        add_endpoint_to_model: this.props.add_endpoint_to_model, 
                                        reload_parent_data: that.reload_data, 
                                        properties: model.properties}));
      }, this);
      var assoc_html = [];
    }

    if(this.state.associations.length > 0){
      this.state.associations.forEach(function(assoc){
        assoc_html.push(App.UIC.Association({name: assoc.name, 
                                              styles: assoc.styles, 
                                              key: assoc.id, 
                                              renamed: assoc.renamed}));
      });
    }

    return(
        React.DOM.div({id: "canvas", onDrop: this.dropped, onDragOver: this.dragedOver, onDragLeave: this.dragLeave}, 
          App.UIC.Panel({to_json: this.props.to_json, add_model: this.register_new_model, model_property_types: this.get_model_names_as_array()}), 
            models_html, 
            assoc_html
        )
    );
  }
});