goog.provide('App.Core.Property.Property_Type');



/**
* abstract property prototype for property types. All the property types
* must extend this prototype
* @constructor
*/
App.Core.Property.Property_Type = function() {
  this.type = '';
};


/**
* returns the type of the property
* @return {String}
*/
App.Core.Property.Property_Type.prototype.get_type = function() {
  return this.type;
};


/**
* function should return a nice summary of the property including not only type
* but also its parameters. For example if it is an integer, this function
* should return something like "integer<10,20>" where 10 is the minimal value
* and 20 the maximal one. This function is used to show the details of the
* property to the user
* @return {string}
*/
App.Core.Property.Property_Type.prototype.get_label = function() {
  return this.type;
};


/**
* returns the property in json so it can be shown in the export
* @return {Object}
*/
App.Core.Property.Property_Type.prototype.to_json = function() {
  return {};
};

