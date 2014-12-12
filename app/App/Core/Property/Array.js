goog.provide('App.Core.Property.Array');
goog.require('App.Core.Property.Property_Type');



/**
* Type of property decimal
* @constructor
* @extends {App.Core.Property.Property_Type}
* @param {String} key
* @param {String} value
*/
App.Core.Property.Array = function(key, value) {
  this.type = 'array';
  this.key = key;
  this.value = value;
};
goog.inherits(App.Core.Property.Array, App.Core.Property.Property_Type);


/**
* function returns property in the json format
* @override
* @return {Object}
*/
App.Core.Property.Array.prototype.to_json = function() {
  return{
    'type' : this.type,
    'key' : this.key,
    'value' : this.value
  };
};


/**
* function returns the current value of the instance
* @return {String}
*/
App.Core.Property.Array.prototype.get_value = function() {
  return this.value;
};


/**
* function the property with all parameters
* @override
* @return {String}
*/
App.Core.Property.Array.prototype.get_label = function() {
  return this.type + ' <' + this.key + ',' + this.value + '>';
};

