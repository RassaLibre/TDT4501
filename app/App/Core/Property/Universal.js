goog.provide('App.Core.Property.Universal');
goog.require('App.Core.Property.Property_Type');



/**
* Universal property which is used to simulate models. This can be used in
* general when an instance is used as a property, not prototype.
* @constructor
* @param {string} type
*/
App.Core.Property.Universal = function(type) {
  this.type = type;
};
goog.inherits(App.Core.Property.Universal, App.Core.Property.Property_Type);


/**
* function returns property in the json format
* @override
* @return {Object}
*/
App.Core.Property.Universal.prototype.to_json = function() {
  return{
    'type' : this.type
  };
};


/**
* function the property with all parameters
* @override
* @return {String}
*/
App.Core.Property.Universal.prototype.get_label = function() {
  return this.type;
};
