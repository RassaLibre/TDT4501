/** @jsx React.DOM */
goog.provide('App.UIC.Wizard.Content');
goog.require('App.Form.Property');
goog.require('App.Form.Endpoint');
App.UIC.Wizard.Content = React.createClass({displayName: 'Content',
  /**
  * property types definition
  */
  propTypes: {
    active_menu_item: React.PropTypes.string,  //name of the active menu item which has been clicked
    add_model: React.PropTypes.func,
    model_property_types: React.PropTypes.array
  },
  /**
  * default property values
  */
  getDefaultProps: function(){
    return {
      active_menu_item: "",
      add_model: function(){console.log('action not defined')},
      model_property_types: []
    };
  },
  /**
  * set the initial state of the component
  */
  getInitialState: function(){
    return {property_count: 1, endpoint_count: 1};
  },
  /**
  * function increments the number of properties in the state of the component
  */
  add_property: function(){
    this.setState({property_count: this.state.property_count + 1});
  },
  /**
  * function increments the number of endpoints in the state of the component
  */
  add_endpoint: function(){
    this.setState({endpoint_count: this.state.endpoint_count + 1});
  },
  /**
  * additional styles for the component
  */
  styles: {
    "padding-top" : 20
  },
  /**
  * when the form is submited, validate name and send all data to the add_model
  * function passed via props to create the new model on the business level
  * TODO: this function seriously needs to be refactored because... wtf?!
  */
  submited: function(){
    var name = this.refs.name.getDOMNode().value;                               //get the new model name
    if(name){ //if the model has no name, discard it
      var collected_properties = [];
      for(var i = 1; i <= this.state.property_count; i++){
        var collected_property = {};  //information about the property will be stored here
        for(var property in this.refs['property_'+i].refs){ //loop over name, type and prop_fields
          if(this.refs['property_'+i].refs.hasOwnProperty(property)) {
            if(property !== 'prop_fields'){ //if it is name or type, no need to go deep
              var value = this.refs['property_'+i].refs[property].getDOMNode().value;
              this.refs['property_'+i].refs[property].getDOMNode().value = "";  //clean the value after you saved it
              collected_property[property] = value; //one property which will be added
            }
            else{ //if it is property fields, we need to go deeper to get the value
              for(var deep_property in this.refs['property_'+i].refs[property].refs){
                if(this.refs['property_'+i].refs[property].refs.hasOwnProperty(deep_property)){
                  var value = this.refs['property_'+i].refs[property].refs[deep_property].getDOMNode().value;
                  this.refs['property_'+i].refs[property].refs[deep_property].getDOMNode().value = '';
                  collected_property[deep_property] = value;
                }
              }              
            }
          }
        }
        if(collected_property.name) collected_properties.push(collected_property);
      }
      //loop over endpoints and add them to an array
      var collected_endpoints = [];
      for(var i = 1; i <= this.state.endpoint_count; i++){
        var collected_endpoint = {};  //information about the property will be stored here
        for(var endpoint in this.refs['endpoint_'+i].refs){
          if(this.refs['endpoint_'+i].refs.hasOwnProperty(endpoint)) {
            var value = this.refs['endpoint_'+i].refs[endpoint].getDOMNode().value;
            this.refs['endpoint_'+i].refs[endpoint].getDOMNode().value = "";  //clean the value after you saved it
            collected_endpoint[endpoint] = value;
          }
        }
        if(collected_property.url) collected_endpoints.push(collected_endpoint);
      }
      this.props.add_model({name: name, endpoints: collected_endpoints, properties: collected_properties});
      this.refs.name.getDOMNode().value = ""; //clear the form
      this.setState({property_count : 1, endpoint_count: 1}); //show only one property form
    }
  },
  /**
  * renders the component
  */
  render: function() {
    //set the visibility of each sections
    var style = {sec_1: {display: 'none'}, sec_2: {display: 'none'}, sec_3: {display: 'none'}};
    if(this.props.active_menu_item === "Model") style.sec_1.display = 'block';
    else if (this.props.active_menu_item === "Properties") style.sec_2.display = 'block';
    else style.sec_3.display = 'block';

    //show the property forms for the amount of selected properties
    var prop_forms = [];
    for(var i = 1; i <= this.state.property_count; i++){
      prop_forms.push(App.Form.Property({ref: "property_"+i, key: i, model_property_types: this.props.model_property_types}));
    }
    //show the property forms for the amount of selected properties
    var end_forms = [];
    for(var i = 1; i <= this.state.endpoint_count; i++){
      end_forms.push(App.Form.Endpoint({ref: "endpoint_"+i, key: i}));
    }

    return(
      React.DOM.div({style: this.styles}, 
        React.DOM.h2(null, "New model"), 
        React.DOM.form({className: "form", callback: this.submited}, 
          React.DOM.div({style: style.sec_1}, 
            React.DOM.label(null, "Name:"), 
            React.DOM.input({type: "text", ref: "name", className: "fancy_input", required: true}), 
            React.DOM.p(null, React.DOM.i(null, "continue to properties..."))
          ), 
          React.DOM.div({style: style.sec_2}, 
            React.DOM.h3(null, "Properties ", React.DOM.a({onClick: this.add_property}, React.DOM.span({className: "glyphicon glyphicon-plus"}))), 
            prop_forms, 
            React.DOM.p(null, React.DOM.i(null, "continue to endpoints..."))
          ), 
          React.DOM.div({style: style.sec_3}, 
            React.DOM.h3(null, "Endpoints ", React.DOM.a({onClick: this.add_endpoint}, React.DOM.span({className: "glyphicon glyphicon-plus"}))), 
            end_forms, 
            React.DOM.button({className: "btn", onClick: this.submited, type: "button"}, "Add model to the canvas")
          )
        )
      )
    );
  }
});