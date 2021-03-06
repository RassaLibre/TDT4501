/** @jsx React.DOM */
goog.provide('App.Form.Property_Type.Double');
App.Form.Property_Type.Double = React.createClass({displayName: 'Double',

  /**
  * property types
  */
  propTypes: {

  },

  /**
  * default properties
  */
  getDefaultProps: function(){

  },

  /**
  * function renders the component
  */
  render: function(){
    return(
      React.DOM.div({className: "margined"}, 
        React.DOM.input({type: "number", className: "fancy_input", ref: "min", placeholder: "min"}), 
        React.DOM.input({type: "number", className: "fancy_input", ref: "max", placeholder: "max"})
      )
    );
  }
});