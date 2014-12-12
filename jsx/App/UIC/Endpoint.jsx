/** @jsx React.DOM */
goog.provide('App.UIC.Endpoint');
goog.require('App.UIC.Editable');
App.UIC.Endpoint = React.createClass({
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
      <tr>
        <td><App.UIC.Editable name={this.props.url} callback={this.props.set_url}/></td>
        <td>{this.props.type}</td>
        <td>
          <a onClick={this.remove_endpoint}><span className="glyphicon glyphicon-remove"></span></a>
        </td>
      </tr>
    );
  }
});