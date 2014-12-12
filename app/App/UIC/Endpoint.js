/** @jsx React.DOM */
goog.provide('App.UIC.Endpoint');
goog.require('App.UIC.Editable');
App.UIC.Endpoint = React.createClass({displayName: 'Endpoint',
  /**
  * property type definitions
  */
  propTypes: {
    url: React.PropTypes.string,
    type: React.PropTypes.string,
    set_url: React.PropTypes.func,
    id: React.PropTypes.string,
    remove_endpoint: React.PropTypes.func
  },
  /**
  * property default values
  */
  getDefaultProps: function(){
    return {
      url: "no url specified",
      type: "no type specified",
      set_url: function(){console.log('no action specified')},
      id: "",
      remove_endpoint: function(){console.log('no action specified')}
    };
  },
  /**
  * function is called to remove the endpoint from the model
  */
  remove_endpoint: function(){
    this.props.remove_endpoint(this.props.id);
  },
  /**
  * renders the component
  */
  render: function() {
    return(
      React.DOM.tr(null, 
        React.DOM.td(null, App.UIC.Editable({name: this.props.url, callback: this.props.set_url})), 
        React.DOM.td(null, this.props.type), 
        React.DOM.td(null, 
          React.DOM.a({onClick: this.remove_endpoint}, React.DOM.span({className: "glyphicon glyphicon-remove"}))
        )
      )
    );
  }
});