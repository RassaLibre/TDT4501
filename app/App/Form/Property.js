/** @jsx React.DOM */
goog.provide('App.Form.Property');
goog.require('App.Form.Property_Type.String');
goog.require('App.Form.Property_Type.Integer');
goog.require('App.Form.Property_Type.Double');
goog.require('App.Form.Property_Type.Array');
App.Form.Property = React.createClass({displayName: 'Property',
  
  /**
  * Property types
  */
  propTypes:{
    model_property_types: React.PropTypes.array //models which can be used as a property type
  },

  /**
  * select string as native choice
  */
  getInitialState: function(){
    return {selected: 'string'};
  },

  /**
  * default property values
  */
  getDefaultProps: function(){
    return {
      model_property_types: []
    };
  },

  /**
  * function ges a type of currently selected type and based on the type
  * returns additional fields which are connected to the type
  */
  get_additional_fields: function(type){
    var additional_fields;
    if(type === "string"){
      additional_fields = (App.Form.Property_Type.String({ref: "prop_fields"}));
    }
    else if(type === "integer"){
      additional_fields = (App.Form.Property_Type.Integer({ref: "prop_fields"}));
    }
    else if(type === "double"){
      additional_fields = (App.Form.Property_Type.Double({ref: "prop_fields"}));
    }
    else if(type === "array"){
      additional_fields = (App.Form.Property_Type.Array({ref: "prop_fields", model_property_types: this.props.model_property_types}));
    }
    else additional_fields = "";
    return additional_fields;
  },

  /**
  * gets an array, loops over the array and returns array of options
  * ready to be assigned to select
  */
  get_rendered_options: function(options){
    var options = [];
    if(this.props.model_property_types.length > 0){
      this.props.model_property_types.forEach(function(model){
        var stringify_type = JSON.stringify(model);
        options.push(React.DOM.option({value: model.name}, model.name));
      });
    }
    return options;  
  },

  /**
  * when the select changes, show the proper subform
  */
  changed: function(e){
    this.setState({selected: this.refs.type.getDOMNode().value});
  },

  /**
  * renders the component
  */
  render: function(){
    return(
      React.DOM.div({className: "property_form"}, 
        React.DOM.input({className: "fancy_input", ref: "name", type: "text", placeholder: "Property name"}), 
        React.DOM.select({className: "fancy_select", ref: "type", onChange: this.changed}, 
          React.DOM.option({value: "string"}, "String"), 
          React.DOM.option({value: "integer"}, "Integer"), 
          React.DOM.option({value: "double"}, "Double"), 
          React.DOM.option({value: "array"}, "Array"), 
          React.DOM.option({value: "geojson"}, "GeoJSON"), 
          React.DOM.option({value: "timestamp"}, "Timestamp"), 
          this.get_rendered_options(this.props.model_property_types)
        ), 
        this.get_additional_fields(this.state.selected)
      )
    );
  }
});