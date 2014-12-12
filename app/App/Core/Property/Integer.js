goog.provide('App.Core.Property.Integer');
goog.require('App.Core.Property.Property_Type');



/**
* Type of property integer
* @constructor
* @extends {App.Core.Property.Property_Type}
* @param {Integer} min
* @param {Integer} max
*/
App.Core.Property.Integer = function(min, max) {
  this.type = 'integer';
  this.max = max;
  this.min = min;
};
goog.inherits(App.Core.Property.Integer, App.Core.Property.Property_Type);


/**
* function returns property in the json format
* @override
* @return {Object}
*/
App.Core.Property.Integer.prototype.to_json = function() {
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
App.Core.Property.Integer.prototype.get_label = function() {
  if ((this.min !== undefined) && (this.max !== undefined))
    return this.type + ' <' + this.min + ',' + this.max + '>';
  else if (this.min !== undefined)
    return this.type + ' <' + this.min + ',->';
  else if (this.max !== undefined)
    return this.type + ' <-,' + this.max + '>';
};

