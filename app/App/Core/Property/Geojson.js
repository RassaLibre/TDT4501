goog.provide('App.Core.Property.Geojson');
goog.require('App.Core.Property.Property_Type');



/**
* Type of property integer
* @constructor
* @extends {App.Core.Property.Property_Type}
*/
App.Core.Property.Geojson = function() {
  this.type = 'geojson';
};
goog.inherits(App.Core.Property.Geojson, App.Core.Property.Property_Type);


/**
* function returns property in the json format
* @override
* @return {Object}
*/
App.Core.Property.Geojson.prototype.to_json = function() {
  return{
    'type' : this.type
  };
};


/**
* function the property with all parameters
* @override
* @return {String}
*/
App.Core.Property.Geojson.prototype.get_label = function() {
  return this.type;
};

