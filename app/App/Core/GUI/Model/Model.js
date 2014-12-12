goog.provide('App.Core.GUI.Model');

goog.require('App.Core.GUI.Endpoint');
goog.require('App.Core.GUI.EndpointType');



/**
*   Object representation of model in Area
*   @constructor
*   @param {Integer} id
*   @param {String} name
*   @param {Array} properties
*   @param {Integer} top
*   @param {Integer} left
*   @param {Integer} width
*   @param {Integer} height
*/
App.Core.GUI.Model = function(id, name, properties, top, left, width, height) {
  this.id = id;
  this.name = name || 'no name';
  this.properties = properties || [];
  this.top = top || 259;
  this.left = left || 687;
  this.width = width || 200;
  this.height = height || 200;
  this.endpoints = [];
};


/**
* Adds the passed property into the array of properties
* @param {App.Core.GUI.Property} property
* @this {App.Core.GUI.Model}
*/
App.Core.GUI.Model.prototype.add_property = function(property) {
  this.properties.push(property);
};


/**
* Function receives a property id and retrieves the property from properties
* attribute with the same id
* @param {String} property_id
* @return {?App.Core.GUI.Property}
*/
App.Core.GUI.Model.prototype.get_property = function(property_id) {
  if (this.properties.length > 0) {
    for (var i = 0; i < this.properties.length; i++) {
      if (this.properties[i].get_id() === property_id)
        return this.properties[i];
    }
    return null;
  }
  else return null;
};


/**
* Adds a new endpoint to the collection
* @param {App.Core.GUI.Endpoint} endpoint
*/
App.Core.GUI.Model.prototype.add_endpoint = function(endpoint) {
  this.endpoints.push(endpoint);
};


/**
*   Export all important information about the model in a JSON format
*   @return {Object}
*   @this {App.Core.GUI.Model}
*/
App.Core.GUI.Model.prototype.to_json = function() {
  var to_be_returned = {name: this.name,
    id: this.id, properties: [], endpoints: []};
  if (this.properties.length) {
    for (var i = 0; i < this.properties.length; i++)
      to_be_returned.properties.push(this.properties[i].to_json());
  }
  if (this.endpoints.length) {
    for (var i = 0; i < this.endpoints.length; i++)
      to_be_returned.endpoints.push(this.endpoints[i].to_json());
  }
  return to_be_returned;
};


/**
* When a model in the UI layer is clicked
*/
App.Core.GUI.Model.prototype.clicked = function() {
  console.log(this);
  console.log(this.id + ' just got clicked!');
};


/**
* removes a property from the property array
* @param {String} id
*/
App.Core.GUI.Model.prototype.remove_property = function(id) {
  for (var i = 0; i < this.properties.length; i++) {
    if (this.properties[i].get_id() === id) {
      this.properties.splice(i, 1);
    }
  }
};


/**
* function removes property from the model
* @param {String} id
*/
App.Core.GUI.Model.prototype.remove_endpoint = function(id) {
  for (var i = 0; i < this.endpoints.length; i++) {
    if (this.endpoints[i].get_id() === id) {
      this.endpoints.splice(i, 1);
    }
  }
};


/**
*   Export the object for React component. when passing a function, this
*   function must be binded to this, otherwise the function is executed
*   on the global scope, therefor this = window
*   @return {object}
*   @this {App.Core.GUI.Model}
*/
App.Core.GUI.Model.prototype.to_react = function() {
  var to_be_returned = {
    'id' : this.id,
    'name' : this.name,
    'styles' : {
      'top' : this.top,
      'left' : this.left
    },
    'properties' : this.properties_to_react.bind(this),
    'endpoints' : this.endpoints_to_react.bind(this),
    'remove_endpoint' : this.remove_endpoint.bind(this),
    'renamed' : this.set_name.bind(this)
  };
  return to_be_returned;
};


/**
* function returns properties ready to shown in UI
* @return {Array}
*/
App.Core.GUI.Model.prototype.properties_to_react = function() {
  var to_be_returned = [];
  if (this.properties.length !== 0) {
    for (var i = 0; i < this.properties.length; i++) {
      to_be_returned.push(this.properties[i].to_react());
    }
  }
  return to_be_returned;
};


/**
* return array of endpoints ready for React component
* @return {Array}
*/
App.Core.GUI.Model.prototype.endpoints_to_react = function() {
  var to_be_returned = [];
  if (this.endpoints.length > 0) {
    for (var i = 0; i < this.endpoints.length; i++) {
      to_be_returned.push(this.endpoints[i].to_react());
    }
  }
  return to_be_returned;
};


/**
* function calculates and returns a center point of the model
* center point is the middle on the passed side (left, right, top, bottom)
* @param {String} side
* @return {Object<string, string>}
*/
App.Core.GUI.Model.prototype.calculate_center_point = function(side) {
  var top, left;
  if (side === 'left') {
    top = this.top + (this.height / 2);
    left = this.left;
    return {top: top, left: left};
  }
  else if (side === 'right') {
    top = this.top + (this.height / 2);
    left = this.left + this.width;
  }
  else if (side === 'top') {
    top = this.top;
    left = this.left + (this.width / 2);
  }
  else {
    top = this.top + this.height;
    left = this.left + (this.width / 2);
  }
  return {top: top, left: left};
};


/**
* function returns id of the instance
* @return {String}
*/
App.Core.GUI.Model.prototype.get_id = function() {
  return this.id;
};


/**
* returns the name of hte instance
* @return {String}
*/
App.Core.GUI.Model.prototype.get_name = function() {
  return this.name;
};


/**
* function returns top of the instance
* @return {Integer}
*/
App.Core.GUI.Model.prototype.get_top = function() {
  return this.top;
};


/**
* function returns left of the instance
* @return {Integer}
*/
App.Core.GUI.Model.prototype.get_left = function() {
  return this.left;
};


/**
* function returns the width of the model
* @return {Integer}
*/
App.Core.GUI.Model.prototype.get_width = function() {
  return this.width;
};


/**
* function returns the height of the model
* @return {Integer}
*/
App.Core.GUI.Model.prototype.get_height = function() {
  return this.height;
};


/**
* Sets the new value for the top property
* @param {Integer} new_top
* @param {Bool} center should the component be on the center?
*/
App.Core.GUI.Model.prototype.set_top = function(new_top, center) {
  if (!center) this.top = new_top;
  else {
    var new_counted_top = new_top - this.height / 2;
    if (new_counted_top >= 0) this.top = new_counted_top;
    else this.top = 0;
  }
};


/**
* sets new name for the model
* @param {String} new_name
*/
App.Core.GUI.Model.prototype.set_name = function(new_name) {
  this.name = new_name;
};


/**
* Sets the new value for the left property
* @param {Integer} new_left
* @param {Bool} center should the component be on the center?
*/
App.Core.GUI.Model.prototype.set_left = function(new_left, center) {
  if (!center) this.left = new_left;
  else {
    var new_counted_left = new_left - this.width / 2;
    if (new_counted_left >= 0) this.left = new_counted_left;
    else this.left = 0;
  }
};


/**
* sets the width of the model
* @param {Integer} width
*/
App.Core.GUI.Model.prototype.set_width = function(width) {
  this.width = width;
};


/**
* sets the height of the model
* @param {Integer} height
*/
App.Core.GUI.Model.prototype.set_height = function(height) {
  this.height = height;
};
