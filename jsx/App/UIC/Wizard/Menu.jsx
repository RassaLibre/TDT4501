/** @jsx React.DOM */
goog.provide('App.UIC.Wizard.Menu');
goog.require('App.UIC.Wizard.MenuItem');
App.UIC.Wizard.Menu = React.createClass({
  /**
  * property types declaration
  */
  propTypes: {
    active_menu_item: React.PropTypes.string,
    change_active_menu_item: React.PropTypes.func
  },
  /**
  * initial state of the component
  */
  getInitialState: function(){
    return {};
  },
  /**
  * default values for the properties
  */
  getDefaultProps: function(){
    return {
      active_menu_item: "",
      change_active_menu_item: function(){console.log('no action defined')}
    };
  },
  /**
  * render the component
  */
  render: function() {
    return(
      <ul className="menu">
        <App.UIC.Wizard.MenuItem
          active={this.props.active_menu_item}
          change_active_menu_item={this.props.change_active_menu_item}
          name="Model"/>
        <App.UIC.Wizard.MenuItem
          active={this.props.active_menu_item}
          change_active_menu_item={this.props.change_active_menu_item}
          name="Properties"/>
        <App.UIC.Wizard.MenuItem
          active={this.props.active_menu_item}
          change_active_menu_item={this.props.change_active_menu_item}
          name="Endpoints"/>
      </ul>
    );
  }
});