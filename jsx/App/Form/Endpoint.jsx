/** @jsx React.DOM */
goog.provide('App.Form.Endpoint');
App.Form.Endpoint = React.createClass({
  propTypes: {

  },
  getDefaultProps: function(){
    return {

    };
  },
  render: function() {
    return(
      <div className="endpoint_form">
        <select className="fancy_select" ref="type">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>OPTION</option>
        </select>
        <input className="fancy_input" ref="url" type="text" placeholder="endpoint url"/>
      </div>
    );
  }
});