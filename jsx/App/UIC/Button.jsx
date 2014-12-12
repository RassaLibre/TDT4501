/** @jsx React.DOM */
goog.provide('App.UIC.Button');
App.UIC.Button = React.createClass({
  propTypes: {
    click: React.PropTypes.func,  //what will happen when the button is being clicked
    label: React.PropTypes.string //what text the button should carry
  },
  getDefaultProps: function(){
    return {
      click: function(){console.log('no action defined')},
      label: "no test defined"
    };
  },
  render: function() {
    return(
        <button className="btn" onClick={this.props.click} >{this.props.label}</button>
    );
  }
});