/** @jsx React.DOM */
goog.provide('App.Form.Property_Type.String');
App.Form.Property_Type.String = React.createClass({

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
      <div className="margined">
        <input type="number" className="fancy_input" ref="length" placeholder="length"/>
        <input type="text" className="fancy_input" ref="regex" placeholder="regex"/>
      </div>
    );
  }
});