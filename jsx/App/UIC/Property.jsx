/** @jsx React.DOM */
goog.provide('App.UIC.Property');
goog.require('App.UIC.Editable')
App.UIC.Property = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    renamed: React.PropTypes.func,
    removed: React.PropTypes.func
  },
  getDefaultProps: function(){
    return {
      id : "no id specified",
      name: "no name specified",
      type: "no type specified",
      renamed: function(){console.log('no action defined')},
      removed: function(){console.log('no action defined')}
    };
  },
  /**
  * remove property from the model
  */
  remove_property: function(){
    this.props.removed(this.props.id);
  },
  render: function() {
    return(
    	<tr>
    		<td><App.UIC.Editable name={this.props.name} callback={this.props.renamed}/></td>
    		<td>{this.props.type}</td>
        <td>       
          <a onClick={this.remove_property}><span className="glyphicon glyphicon-remove"></span></a>
        </td>
    	</tr>
    );
  }
});