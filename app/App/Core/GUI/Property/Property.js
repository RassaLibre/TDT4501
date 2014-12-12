goog.provide('App.Core.GUI.Property');



/**
* Object representation of the properties
* @constructor
* @param {String} id
* @param {String} name
* @param {App.Core.Property.Property_Type} type
*/
App.Core.GUI.Property = function(id, name, type) {
  this.id = id;
  this.name = name || '';
  this.type = type;
};


/**
* Exports the object into a format for React component
* @return {Object}
* @this {App.Core.GUI.Property}
*/
App.Core.GUI.Property.prototype.to_react = function() {
  return {
    'id' : this.id,
    'name' : this.name,
    'type' : this.type.get_label(),
    'renamed' : this.set_name.bind(this)
  };
};


/**
* Exports the object to JSON
* @return {Object}
*/
App.Core.GUI.Property.prototype.to_json = function() {
  return{
    'id' : this.id,
    'name' : this.name,
    'type' : this.type.to_json()
  };
};


/**
* renames the property
* @param {String} new_name
*/
App.Core.GUI.Property.prototype.set_name = function(new_name) {
  this.name = new_name;
};


/**
* returns the id of the instance
* @return {String}
*/
App.Core.GUI.Property.prototype.get_id = function() {
  return this.id;
};


/**
* returns the type of the instance
* @return {App.Core.Property.Property_Type}
*/
App.Core.GUI.Property.prototype.get_type = function() {
  return this.type;
};


