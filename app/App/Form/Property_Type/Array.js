/** @jsx React.DOM */
goog.provide('App.Form.Property_Type.Array');
App.Form.Property_Type.Array = React.createClass({displayName: 'Array',

  /**
  * property types
  */
  propTypes: {
    model_property_types: React.PropTypes.array
  },

  /**
  * default properties
  */
  getDefaultProps: function(){
    model_property_types: []
  },

  /**
  * function renders the component
  */
  render: function(){
    //loop over all models and add them as possible types
    var options = [];
    if(this.props.model_property_types.length > 0){
      this.props.model_property_types.forEach(function(model){
        var stringify_type = JSON.stringify(model);
        options.push(React.DOM.option({value: model.name}, model.name));
      });
    }
    return(
      React.DOM.div({className: "margined"}, 
        React.DOM.label(null, "Key type:"), 
        React.DOM.select({className: "fancy_select", ref: "key"}, 
          React.DOM.option({value: "string"}, "String"), 
          React.DOM.option({value: "integer"}, "Integer")
        ), 
        React.DOM.label(null, "Value type:"), 
        React.DOM.select({className: "fancy_select", ref: "value"}, 
          React.DOM.option({value: "string"}, "String"), 
          React.DOM.option({value: "integer"}, "Integer"), 
          React.DOM.option({value: "double"}, "Double"), 
          options
        )
      )
    );
  }
});