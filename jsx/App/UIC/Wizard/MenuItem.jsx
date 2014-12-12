/** @jsx React.DOM */
goog.provide('App.UIC.Wizard.MenuItem');
App.UIC.Wizard.MenuItem = React.createClass({
  /**
  * property types definition
  */
  propTypes: {
    name: React.PropTypes.string,
    active: React.PropTypes.string,
    change_active_menu_item: React.PropTypes.func
  },
  /**
  * default value of the properties
  */
  getDefaultProps: function(){
    return {
      name: "",
      active: "",
      change_active_menu_item: function(){console.log('no action specified')}
    };
  },
  /**
  * when the menuItem is clicked
  */
  clicked: function(){
    //set the new active menu item
    this.props.change_active_menu_item(this.props.name);
  },
  /**
  * render the component
  */
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'active' : this.props.active == this.props.name
    });
    return(
      <li className={classes} onClick={this.clicked}>{this.props.name}</li>
    );
  }
});