/** @jsx React.DOM */
goog.provide('App.UIC.Property');
goog.require('App.UIC.Editable')
App.UIC.Property = React.createClass({displayName: 'Property',
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
    	React.DOM.tr(null, 
    		React.DOM.td(null, App.UIC.Editable({name: this.props.name, callback: this.props.renamed})), 
    		React.DOM.td(null, this.props.type), 
        React.DOM.td(null, 
          React.DOM.a({onClick: this.remove_property}, React.DOM.span({className: "glyphicon glyphicon-remove"}))
        )
    	)
    );
  }
});