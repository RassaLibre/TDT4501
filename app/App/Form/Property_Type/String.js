/** @jsx React.DOM */
goog.provide('App.Form.Property_Type.String');
App.Form.Property_Type.String = React.createClass({displayName: 'String',

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
        React.DOM.input({type: "number", className: "fancy_input", ref: "length", placeholder: "length"}), 
        React.DOM.input({type: "text", className: "fancy_input", ref: "regex", placeholder: "regex"})
      )
    );
  }
});