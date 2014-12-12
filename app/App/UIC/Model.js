/** @jsx React.DOM */
goog.provide('App.UIC.Model');
goog.require('App.UIC.Property');
goog.require('App.UIC.Endpoint');
goog.require('App.UIC.Editable');
goog.require('App.Form.Property');
goog.require('App.Form.Endpoint');

App.UIC.Model = React.createClass({displayName: 'Model',
  /**
  * defined prop types
  */
  propTypes: {
    resized: React.PropTypes.func,         //callback to what will happen when there is a posibility that the model changed size. It also updates associations
    id: React.PropTypes.string.isRequired, //id of the model
    properties: React.PropTypes.func,     //array of properties
    endpoints: React.PropTypes.func,      //array of endpoints
    styles: React.PropTypes.object,        //object with defined styles
    name: React.PropTypes.string.isRequired,//name of the model
    property_remove: React.PropTypes.func,
    remove_endpoint: React.PropTypes.func,
    remove_model: React.PropTypes.func,
    model_rendered: React.PropTypes.func,   //function which notifies Area that the model is done with mounting
    update_associations_of_model: React.PropTypes.func,
    model_property_types: React.PropTypes.array, //for the form for adding a new property
    add_property_to_model: React.PropTypes.func,  //function for adding a property to a model
    add_endpoint_to_model: React.PropTypes.func,    //because adding a new endpoint is allowed
    remove_association: React.PropTypes.func,
    reload_parent_data: React.PropTypes.func
  },

  /**
  * default prop values
  */
  getDefaultProps: function(){
    return {
      resized: function(){console.log('no action specified')},
      property_remove: function(){console.log('no action specified')},
      id: "no id specified",
      properties: function(){console.log('no action specified')},
      endpoints: function(){console.log('no action specified')},
      styles: {},
      name: "no name specified",
      remove_endpoint: function(){console.log('no action specified')},
      remove_model: function(){console.log('no action specified')},
      model_rendered: function(){console.log('no action specified')},
      update_associations_of_model: function(){console.log('nothing specified')},
      model_property_types: [],
      add_property_to_model: function(){console.log('nothing specified')},
      add_endpoint_to_model: function(){console.log('nothins speficied')},
      remove_association: function(){console.log('nothing specified')},
      reload_parent_data: function(){console.log('nothins specified')}
    };
  },
  /**
  * Sets the initial state of the component
  */
  getInitialState: function(){
    //set the icons so the data icon is natively active
    return {data_active: true,
            rest_active: false,
            add_new_endpoint: false,
            add_new_property: false,            //indicates if the form for adding a new prop should be shown or not
            properties: [],
            endpoints: this.props.endpoints};
  },
  /**
  * When a model is mounted, an information about its size needs to be sent
  * to the business logic so the the model can calculate relations and show
  * them
  */
  componentDidMount: function(){
    console.log('second time!');
    this.setState({properties: this.props.properties(), endpoints: this.props.endpoints()},function(){
      var dimensions = this.get_element_dimensions();
      this.props.resized(this.props.id, dimensions, true);
      this.props.model_rendered(this.props.id);
    });
  },

  /**
  * specifies when the component should update
  */
  shouldComponentUpdate: function(next_props, next_state){
    return true;
  },

  /**
  * reloads the data
  */
  reload_data: function(){
    this.setState({
      properties: this.props.properties(),
      endpoints: this.props.endpoints()
    });
  },

  /**
  * When REST icon is clicked, make the icon active and disactive all other
  * icons. There is a posibility that the height and width of this element
  * shall change so new dimensions are sent to the business logic which
  * recalculates dependent elements and re-render the canvas
  */
  show_rest_routes: function(e){
    this.setState({data_active: false, rest_active: true,
      add_new_endpoint : false, add_new_property: false}, function(){
      var dimensions = this.get_element_dimensions();
      this.props.resized(this.props.id, dimensions, true);
      //the model gets resized so the associations needs to be recalculated
      this.props.update_associations_of_model(this.props.id);
    });
    e.stopPropagation();  //do not trigger clicks on parent
  },

  /**
  * When data icon is clicked, make the icon active and disactive all other
  * icons. There is a posibility that the height and width of this element
  * shall change so new dimensions are sent to the business logic which
  * recalculates dependent elements and re-render the canvas
  */
  show_data_structure: function(e){
    this.setState({data_active: true, rest_active: false,
      add_new_endpoint : false, add_new_property: false}, function(){
      var dimensions = this.get_element_dimensions();
      this.props.resized(this.props.id, dimensions, true);
      //the model gets resized so the associations needs to be recalculated
      this.props.update_associations_of_model(this.props.id);
    });
    e.stopPropagation();  //do not trigger clicks on parent
  },

  /**
  * functon returns width and height of the model
  * this is needed so the business logic gets the right information and
  * calculations for relations are correct
  */  
  get_element_dimensions: function(){
    var dom_node = this.getDOMNode();
    return {"height" : dom_node.offsetHeight, "width" : dom_node.offsetWidth};
  },

  /**
  * Area has to know what model has been moved, therefor ID of the model has
  * to be sent when drag starts. There is also a position of the mouse when
  * drag started, so the positioning of the component can be done smoothly.
  */
  drag_started: function(e){
    var mouse_x = e.clientX;
    var mouse_y = e.clientY;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json',
        '{"id" : "'+this.props.id+'", "mouse_x" : '+mouse_x+
        ', "mouse_y" : '+mouse_y+'}');    
  },

  /**
  * function is called when a preperty is removed from a model.
  * this function first loops over the properties, finds the right one,
  * removes it and then sets a new state. Because the size of the model might
  * have changed, the business layer needs to be notified about the new dimensions
  */
  remove_property: function(property_id){
    for(var i = 0; i < this.state.properties.length; i++){
      if(this.state.properties[i].id === property_id){
        var new_prop_state = this.state.properties;
        new_prop_state.splice(i,1); //remove the removed property from the state
        this.setState({properties: new_prop_state},function(){  //update state
          var dimensions = this.get_element_dimensions();   //get the new dimensions of the model
          this.props.resized(this.props.id, dimensions, false); //update the dimensions in the business layer
          var res = this.props.property_remove(this.props.id, property_id); //remove the property in the business layer
          this.props.reload_parent_data();  //reload parent data because of possibility that an association has been deleted
        });
      }
    }
  },

  /**
  * function shows the form for adding a new property
  */
  set_the_new_property_form_visibility: function(){
    if(this.state.data_active){
      this.setState({add_new_property: !this.state.add_new_property});
    }
    else{
      this.setState({add_new_endpoint: !this.state.add_new_endpoint});
    }
  },

  /**
  * adds a new property to the model. It gets data from the data structure
  * what has been created because if an property is added, it is possible
  * that a new relation has been created. This is stored in the object 'created_elements'
  */
  add_new_property: function(){
    var collected_property = {};
    collected_property.name = this.refs.new_property.refs.name.getDOMNode().value;
    collected_property.type = this.refs.new_property.refs.type.getDOMNode().value;
    //if there are deep properties, get them. This is because when the property
    //is type of an model, there are deep properties
    if(this.refs.new_property.refs.prop_fields){
      for(var deep_property in this.refs.new_property.refs.prop_fields.refs){
        if(this.refs.new_property.refs.prop_fields.refs.hasOwnProperty(deep_property)){
          var value = this.refs.new_property.refs.prop_fields.refs[deep_property].getDOMNode().value;
          this.refs.new_property.refs.prop_fields.refs[deep_property].getDOMNode().value = '';
          collected_property[deep_property] = value;
        }
      } 
    }
    if(collected_property.name){
      var created_elements = this.props.add_property_to_model(this.props.id, collected_property);
      if(created_elements.property) this.reload_data();
      if(created_elements.associations.length > 0) this.props.reload_parent_data();
    }
  },
  /**
  * function collects the data from the form for new endpoint and adds
  * the property. It also calls a proper function in the data
  * structure to ensure that the data are sinchronized
  */
  add_new_endpoint: function(){
    var collected_endpoint = {};
    collected_endpoint.type = this.refs.new_endpoint.refs.type.getDOMNode().value; 
    collected_endpoint.url = this.refs.new_endpoint.refs.url.getDOMNode().value;
    if(collected_endpoint.url){
      var new_endpoint = this.props.add_endpoint_to_model(this.props.id, collected_endpoint);
      this.reload_data();
    }
  },

  /**
  * removes the model from the collection and UI
  */
  remove_model: function(){
    this.props.remove_model(this.props.id);
  },

  /**
  * removes the endpoint from UI and from the models
  */
  remove_endpoint: function(endpoint_id){
    for(var i = 0; i < this.state.endpoints.length; i++){
      if(this.state.endpoints[i].id === endpoint_id){
        var new_end_state = this.state.endpoints;
        new_end_state.splice(i,1); //remove the removed property from the state
        this.setState({endpoints: new_end_state},function(){  //update state
          var dimensions = this.get_element_dimensions();   //get the new dimensions of the model
          this.props.resized(this.props.id, dimensions, false); //update the dimensions in the business layer
          this.props.remove_endpoint(endpoint_id);
          this.props.reload_parent_data();
        });
      }
    }
  },

  /**
  * Renders the component
  */
  render: function() {
    //class extenssion
    var cx = React.addons.classSet;
    //class rules for icon of the data structure view
    var data_icon_class = cx({
      'glyphicon' : true,
      'glyphicon-list-alt' : true,
      'active' : this.state.data_active
    });
    //class rules for icon of the REST API endpoints
    var rest_icon_class = cx({
      'glyphicon' : true,
      'glyphicon-transfer' : true,
      'active' : this.state.rest_active
    });
    //check the visibility of add new property form
    var add_anything_visibility = (this.state.add_new_property || this.state.add_new_endpoint) ? {display: 'block'} : {display: 'none'};
    var property_form_visibility = (this.state.add_new_property) ? {display: 'block'} : {display: 'none'};
    var endpoint_form_visibility = (this.state.add_new_endpoint) ? {display: 'block'} : {display: 'none'};
    //give the button for adding the new property a proper icon based on if the form is shown or not
    var add_property_icon = cx({
      'glyphicon' : true,
      'glyphicon-remove' : this.state.add_new_property || this.state.add_new_endpoint,
      'glyphicon-plus' : !this.state.add_new_property || this.state.add_new_endpoint
    });

    //if the data structure is suppose to be shown 
    if(this.state.data_active){
      //Because component for each property needs to be rendered
      var properties_html = [];
      if(this.state.properties){
          this.state.properties.forEach(function(property){
            properties_html.push(App.UIC.Property({name : property.name, id: property.id, key: property.id, type : property.type, removed: this.remove_property, renamed: property.renamed}));
          }, this);
      }
    }
    //if the REST endpoints are being shown
    else{
      //Because component for each property needs to be rendered
      var properties_html = [];
      if(this.state.endpoints){
        var that = this;
        this.state.endpoints.forEach(function(endpoint){
          properties_html.push(App.UIC.Endpoint({url : endpoint.url, type : endpoint.type, set_url: endpoint.set_url, id: endpoint.id, key: endpoint.id, remove_endpoint: that.remove_endpoint}));
        });
      }
    }
    console.log('MODEL '+this.props.id+' is being rendered');
    return(
        React.DOM.div({className: "model", id: this.props.id, draggable: "true", onDragStart: this.drag_started, style: this.props.styles}, 
            React.DOM.header(null, 
                React.DOM.h3(null, 
                  React.DOM.strong(null, 
                    App.UIC.Editable({name: this.props.name, callback: this.props.renamed})
                  ), 
                  React.DOM.a({onClick: this.remove_model}, React.DOM.span({className: "glyphicon glyphicon-trash"}))
                  )
            ), 
            React.DOM.table(null, 
              React.DOM.tbody(null, 
                properties_html
              )
            ), 
            React.DOM.div({style: add_anything_visibility}, 
              React.DOM.div({style: property_form_visibility}, 
                App.Form.Property({ref: "new_property", model_property_types: this.props.model_property_types}), 
                React.DOM.button({className: "btn", onClick: this.add_new_property}, "Add new property")
              ), 
              React.DOM.div({style: endpoint_form_visibility}, 
                App.Form.Endpoint({ref: "new_endpoint"}), 
                React.DOM.button({className: "btn", onClick: this.add_new_endpoint}, "Add new endpoint")
              )
            ), 
            React.DOM.div({className: "model-icons-wrapper"}, 
              React.DOM.div({className: "model-icons"}, 
                React.DOM.a({onClick: this.show_data_structure}, React.DOM.span({className: data_icon_class})), 
                React.DOM.a({onClick: this.show_rest_routes}, React.DOM.span({className: rest_icon_class}))
              ), 
              React.DOM.div({className: "model-options"}, 
                React.DOM.a({onClick: this.set_the_new_property_form_visibility}, React.DOM.span({className: add_property_icon, title: "add new property"}))
              ), 
              React.DOM.div({className: "clear"})
            )
        )
    );
  }
});