/** @jsx React.DOM */
goog.provide('App.Form.Property_Type.Array');
App.Form.Property_Type.Array = React.createClass({

  /**
  * property types
  */
  propTypes: {
    model_property_types: React.PropTypes.array
  },

  /**
  * default properties
  */
  getDefaultProps: function(){
    model_property_types: []
  },

  /**
  * function renders the component
  */
  render: function(){
    //loop over all models and add them as possible types
    var options = [];
    if(this.props.model_property_types.length > 0){
      this.props.model_property_types.forEach(function(model){
        var stringify_type = JSON.stringify(model);
        options.push(<option value={model.name}>{model.name}</option>);
      });
    }
    return(
      <div className="margined">
        <label>Key type:</label>
        <select className="fancy_select" ref="key">
          <option value="string">String</option>
          <option value="integer">Integer</option>
        </select>
        <label>Value type:</label>
        <select className="fancy_select" ref="value">
          <option value="string">String</option>
          <option value="integer">Integer</option>
          <option value="double">Double</option>
          {options}
        </select>
      </div>
    );
  }
});