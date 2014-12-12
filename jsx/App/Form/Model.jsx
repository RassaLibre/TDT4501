/** @jsx React.DOM */
goog.provide('App.Form.Model');
goog.require('App.Form.Property');
App.Form.Model = React.createClass({

  /**
  * define properties
  */
  propTypes: {
    model_property_types: React.PropTypes.array,
    add_model: React.PropTypes.func
  },

  /**
  * define their default value
  */
  getDefaultProps: function(){
    return {
      model_property_types: [],
      add_model: function(){console.log('no action specified')}
    };
  },

  /**
  * show only one property form in default
  */
  getInitialState: function(){
    return {count : 1};
  },

  /**
  * when the form is submited, validate name and send all data to the add_model
  * function passed via props to create the new model on the business level
  */
  submited: function(){
    var name = this.refs.name.getDOMNode().value;                               //get the new model name
    var include_endpoints = this.refs.include_endpoints.getDOMNode().checked;   //should we include basic endpoints?
    if(name){ //if the model has no name, discard it
      var collected_properties = [];
      for(var i = 1; i <= this.state.count; i++){
        var collected_property = {};  //information about the property will be stored here
        for(var property in this.refs['property_'+i].refs){
          if (this.refs['property_'+i].refs.hasOwnProperty(property)) {
            var value = this.refs['property_'+i].refs[property].getDOMNode().value;
            this.refs['property_'+i].refs[property].getDOMNode().value = "";  //clean the value after you saved it
            collected_property[property] = value;
          }
        }
        collected_properties.push(collected_property);
      }
      console.log(collected_properties);
      //create the model in the business logic
      this.props.add_model({name: name, endpoints: include_endpoints, properties: collected_properties});
      this.refs.name.getDOMNode().value = ""; //clear the form
      this.refs.include_endpoints.getDOMNode().checked = false;
      this.setState({count : 1}); //show only one property form
    }
  },

  /**
  * when adding a property, increase the counter
  */
  add_property: function(){
    this.setState({count : this.state.count + 1});
  },

  /**
  * renders the component
  */
  render: function() {
    var prop_forms = [];
    for(var i = 1; i <= this.state.count; i++){
      prop_forms.push(<App.Form.Property ref={"property_"+i} key={i} model_property_types={this.props.model_property_types}/>);
    }
    return(
      <div>
        <h2>New model</h2>
        <form className="form" callback={this.submited}>
          <label>Name:</label>
          <input type="text" ref="name" className="fancy_input" required/>
          <label><input type="checkbox" ref="include_endpoints"/> Include basic endpoints</label>
          <h3>Properties <a onClick={this.add_property}><span className="glyphicon glyphicon-plus"></span></a></h3>
          {prop_forms}
          <button className="btn" onClick={this.submited} type="button">Add model to the canvas</button>
        </form>
      </div>
    );
  }
});