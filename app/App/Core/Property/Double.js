goog.provide('App.Core.Property.Double');
goog.require('App.Core.Property.Property_Type');



/**
* Type of property decimal
* @constructor
* @extends {App.Core.Property.Property_Type}
* @param {Integer} min
* @param {Integer} max
*/
App.Core.Property.Double = function(min, max) {
  this.type = 'double';
  this.min = min;
  this.max = max;
};
goog.inherits(App.Core.Property.Double, App.Core.Property.Property_Type);


/**
* function returns property in the json format
* @override
* @return {Object}
*/
App.Core.Property.Double.prototype.to_json = function() {
  return{
    'type' : this.type,
    'min' : this.min,
    'max' : this.max
  };
};


/**
* function returns the full string representaiton of the property
* @override
* @return {String}
*/
App.Core.Property.Double.prototype.get_label = function() {
  if ((this.min !== undefined) && (this.max !== undefined))
    return this.type + ' <' + this.min + ',' + this.max + '>';
  else if (this.min !== undefined)
    return this.type + ' <' + this.min + ',->';
  else if (this.max !== undefined)
    return this.type + ' <-,' + this.max + '>';
};
