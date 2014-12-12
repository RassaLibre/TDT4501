/** @jsx React.DOM */
goog.provide('App.UIC.Editable');
App.UIC.Editable = React.createClass({displayName: 'Editable',
  /**
  * Prop definition
  */
  propTypes: {
    name: React.PropTypes.string,
    callback: React.PropTypes.func
  },
  /**
  * default prop values
  */
  getDefaultProps: function(){
    return {
      name: "",
      callback: function(){console.log('no action defined')}
    };
  },
  /**
  * What will happen when the input filed is blured
  */
  blured: function(){
    var new_name = this.refs.new_name.getDOMNode().value;
    if(!new_name) new_name = this.props.name; //if there is no new name, set the old one
    this.setState({editable: false, name: new_name}, function(){
      this.props.callback(new_name);
    });
  },
  /**
  * What happens when the span is double clicked
  */
  double_clicked: function(e){
    this.setState({editable: true}, function(){
      this.getDOMNode().focus();
    });
  },
  /**
  * initial state of the component
  */
  getInitialState: function(){
    return {editable: false, name: this.props.name};
  },
  render: function() {
    if(this.state.editable){
      return(
        React.DOM.input({type: "text", className: "area_input", ref: "new_name", defaultValue: this.state.name, onBlur: this.blured})
      );
    }
    else{
      return(
        React.DOM.span({onDoubleClick: this.double_clicked}, this.state.name)
      );
    }
  }
});