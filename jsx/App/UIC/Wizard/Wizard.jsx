/** @jsx React.DOM */
goog.provide('App.UIC.Wizard.Wizard');
goog.require('App.UIC.Wizard.Menu');
goog.require('App.UIC.Wizard.Content');
App.UIC.Wizard.Wizard = React.createClass({
  /**
  * property types
  */
  propTypes: {
    add_model: React.PropTypes.func,
    model_property_types: React.PropTypes.array //array of already added models so they can be used in case of Array
  },
  getInitialState: function(){
    return {active_menu_item: "Model"};
  },
  /**
  * default values of the properties
  */
  getDefaultProps: function(){
    return {
      add_model: function(){console.log('no function specified');},
      model_property_types: []
    };
  },
  /**
  * changes the active menu item status for the one passed as parameter
  */
  change_active_menu_item: function(clicked){
    this.setState({active_menu_item: clicked});
  },
  /**
  * render the component
  */
  render: function() {
    return(
      <div>
        <App.UIC.Wizard.Menu
          active_menu_item={this.state.active_menu_item}
          change_active_menu_item={this.change_active_menu_item}/>
        <div className="pad dark_bg">
          <App.UIC.Wizard.Content
          active_menu_item={this.state.active_menu_item}
          add_model={this.props.add_model}
          model_property_types={this.props.model_property_types}/>
        </div>
      </div>
    );
  }
});