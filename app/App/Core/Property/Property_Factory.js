goog.provide('App.Core.Property.Propety_Factory');

goog.require('App.Core.Property.Array');
goog.require('App.Core.Property.Double');
goog.require('App.Core.Property.Geojson');
goog.require('App.Core.Property.Integer');
goog.require('App.Core.Property.String');
goog.require('App.Core.Property.Timestamp');
goog.require('App.Core.Property.Universal');



/**
* Facotry is getting an object from form and then based on property "type"
* determines what kind of of object should be returned
* @constructor
* @param {Object} data information about the property to be generated
*/
App.Core.Property.Propety_Factory = function(data) {
  this.data = data || {};
};


/**
* returns the prototype of right property
* which is chosen based on the type property
* @return {Object}
*/
App.Core.Property.Propety_Factory.prototype.get_instance = function() {
  if (!this.data) return null;
  if (!this.data.type) return null;
  if (this.data.type === 'string') {
    return new App.Core.Property.String(this.data.length, this.data.regex);
  }
  else if (this.data.type === 'integer') {
    return new App.Core.Property.Integer(this.data.min, this.data.max);
  }
  else if (this.data.type === 'double') {
    return new App.Core.Property.Double(this.data.min, this.data.max);
  }
  else if (this.data.type === 'array') {
    return new App.Core.Property.Array(this.data.key, this.data.value);
  }
  else if (this.data.type === 'geojson') {
    return new App.Core.Property.Geojson();
  }
  else if (this.data.type === 'timestamp') {
    return new App.Core.Property.Timestamp();
  }
  else {  //the property type is an instance, return universal object
    return new App.Core.Property.Universal(this.data.type);
  }
};


/**
* sets the new data to the factory
* @param {Object} new_data
  */
App.Core.Property.Propety_Factory.prototype.set_data = function(new_data) {
  this.data = new_data;
};
