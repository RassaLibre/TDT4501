goog.provide('App.Core.Property.Timestamp');
goog.require('App.Core.Property.Property_Type');



/**
* Type of property integer
* @constructor
* @extends {App.Core.Property.Property_Type}
*/
App.Core.Property.Timestamp = function() {
  this.type = 'timestamp';
};
goog.inherits(App.Core.Property.Timestamp, App.Core.Property.Property_Type);


/**
* function returns property in the json format
* @override
* @return {Object}
*/
App.Core.Property.Timestamp.prototype.to_json = function() {
  return{
    'type' : this.type
  };
};


/**
* function the property with all parameters
* @override
* @return {String}
*/
App.Core.Property.Timestamp.prototype.get_label = function() {
  return this.type;
};

