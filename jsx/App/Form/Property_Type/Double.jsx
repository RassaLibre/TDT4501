/** @jsx React.DOM */
goog.provide('App.Form.Property_Type.Double');
App.Form.Property_Type.Double = React.createClass({

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
        <input type="number" className="fancy_input" ref="min" placeholder="min"/>
        <input type="number" className="fancy_input" ref="max" placeholder="max"/>
      </div>
    );
  }
});