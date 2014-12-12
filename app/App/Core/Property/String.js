goog.provide('App.Core.Property.String');
goog.require('App.Core.Property.Property_Type');



/**
* Type of property String
* @constructor
* @extends {App.Core.Property.Property_Type}
* @param {Integer} length
* @param {String} regex
*/
App.Core.Property.String = function(length, regex) {
  //App.Core.Property.Property_Type.call(this, length, regex);
  goog.base(this, length, regex);
  this.type = 'string';
  this.length = length;
  this.regex = regex;
};
goog.inherits(App.Core.Property.String, App.Core.Property.Property_Type);


/**
* function returns property in the json format
* @override
* @return {Object}
*/
App.Core.Property.String.prototype.to_json = function() {
  return{
    'type' : this.type,
    'length' : this.length,
    'regex' : this.regex
  };
};


/**
* function the property with all parameters
* @override
* @return {String}
*/
App.Core.Property.String.prototype.get_label = function() {
  if ((this.length !== undefined) && (this.regex !== undefined))
    return this.type + ' <' + this.length + ',' + this.regex + '>';
  else if (this.length !== undefined)
    return this.type + ' <' + this.length + ',->';
  else if (this.regex !== undefined)
    return this.type + ' <-,' + this.regex + '>';
};
