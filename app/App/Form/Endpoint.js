/** @jsx React.DOM */
goog.provide('App.Form.Endpoint');
App.Form.Endpoint = React.createClass({displayName: 'Endpoint',
  propTypes: {

  },
  getDefaultProps: function(){
    return {

    };
  },
  render: function() {
    return(
      React.DOM.div({className: "endpoint_form"}, 
        React.DOM.select({className: "fancy_select", ref: "type"}, 
          React.DOM.option(null, "GET"), 
          React.DOM.option(null, "POST"), 
          React.DOM.option(null, "PUT"), 
          React.DOM.option(null, "OPTION")
        ), 
        React.DOM.input({className: "fancy_input", ref: "url", type: "text", placeholder: "endpoint url"})
      )
    );
  }
});