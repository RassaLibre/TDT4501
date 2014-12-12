/** @jsx React.DOM */
goog.provide('App.UIC.Association');
goog.require('App.UIC.Editable');

App.UIC.Association = React.createClass({
  /**
  * props definition
  */
  propTypes: {
    styles: React.PropTypes.object,
    name: React.PropTypes.string
  },
  /**
  * props default values
  */
  getDefaultProps: function(){
    return {
      styles: {},
      name: "no name specified"
    };
  },
  render: function(){
    console.log('ASSOCIATION '+this.props.name+' is being rendered');
    return (
      <div className="relation" style={this.props.styles}>
        <App.UIC.Editable name={this.props.name} callback={this.props.renamed}/>
      </div>
    );
  }
});