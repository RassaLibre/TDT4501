/** @jsx React.DOM */
goog.provide('App.UIC.Panel');
goog.require('App.UIC.Wizard.Wizard');
App.UIC.Panel = React.createClass({displayName: 'Panel',

    /**
    *   set the default property types
    */
    propTypes: {
        click: React.PropTypes.func,    //when a test button is clicked
        add_model: React.PropTypes.func, //when add model button in App.Form.Model is clicked
        model_property_types: React.PropTypes.array,
        to_json: React.PropTypes.func
    },

    /**
    *   get default values of the properties
    */
    getDefaultProps: function(){
        return {
            click: function(){console.log('No action specified')},
            add_model: function(){console.log('No action specified')},   //function for adding a new model on canvas
            model_property_types: [],
            to_json: function(){console.log('No action specified')}
        };
    },

    /**
    *   returns the initial state of the component
    */
    getInitialState: function(){
        //styles are used for the whole control panel and hidden signalises
        //if the control panel is hidden or not.
        return {styles: {left: 0, top: 0}, hidden: false, show_json: false, json: ""};
    },

    /**
    *   when the button for hiding/showing the control panel is clicked
    *   start an interval and hide/show the control panel with a nice animation
    */
    move: function(){
        var that = this;
        var interval = setInterval(function(){
            if(that.state.hidden){  //if the panel is hidden
                var new_left = that.state.styles.left + 3;
                var limit = 0;
            }
            else{   //if the pannel is not hidden
                var new_left = that.state.styles.left - 3;
                var limit = -252;
            }
            that.setState({styles: {left: new_left, top: 0}});
            if(new_left === limit){
                clearInterval(interval);
                that.setState({hidden: !that.state.hidden});
            }
        },1);
    },

    /**
    *   when the generate button is clicked, this function hides the "new model"
    *   panel and shows textarea with the generated JSON
    */
    generate_json: function(){
        this.setState({show_json: !this.state.show_json},function(){
            if(this.state.show_json){
                console.log('show me the json!');
                var json = this.props.to_json();
                console.log(json);
                this.setState({json: json})
            }
            else console.log('ok, enough json lets get back to work');
        });
    },

    /**
    *   render the component
    */
    render: function() {

        //make a rule on classes so that the arrow always
        //have the right direction in which the control panel is going
        //to be moved
        var cx = React.addons.classSet;
        var move_control_panel_icon_classes = cx({
            'glyphicon' : true,
            'glyphicon-chevron-left' : !this.state.hidden,
            'glyphicon-chevron-right': this.state.hidden
        });

        //decide on the button caption based on if the user wants to show
        //json or control panel
        var generate_button_title = "";
        if(this.state.show_json) generate_button_title = "Back to the Control Panel";
        else generate_button_title = "Generate JSON";

        var decision = "";
        if(this.state.show_json){
            decision = (React.DOM.textarea({className: "json_text_area", rows: "10", value: this.state.json, readOnly: true}));
        }
        else{
            decision = (
                App.UIC.Wizard.Wizard({
                    add_model: this.props.add_model, 
                    model_property_types: this.props.model_property_types})
            );
        }

        return(
            React.DOM.div({className: "container", style: this.state.styles}, 
                React.DOM.h1({className: "move_panel_button"}, 
                    React.DOM.span({onClick: this.move, className: move_control_panel_icon_classes})
                ), 
                React.DOM.h1(null, "Control panel"), 
                React.DOM.button({className: "btn", onClick: this.generate_json}, generate_button_title), 
                decision
            )
        );
    }
});