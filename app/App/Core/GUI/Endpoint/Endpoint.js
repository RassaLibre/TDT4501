goog.provide('App.Core.GUI.Endpoint');
goog.provide('App.Core.GUI.EndpointType');



/**
* Class representing endpoint in which can be inserted into a model
* @param {String} id
* @param {App.Core.GUI.EndpointType} type
* @param {String} url
* @constructor
*/
App.Core.GUI.Endpoint = function(id, type, url) {
  this.id = id;
  this.type = type;
  this.url = url;
};


/**
* function sets the new url name
* @param {String} new_url
*/
App.Core.GUI.Endpoint.prototype.set_url = function(new_url) {
  this.url = new_url;
};


/**
* function returns the id of the instance
* @return {String}
*/
App.Core.GUI.Endpoint.prototype.get_id = function() {
  return this.id;
};


/**
* returns the type of the endpoint
* @return {App.Core.GUI.EndpointType}
*/
App.Core.GUI.Endpoint.prototype.get_type = function() {
  return this.type;
};


/**
* returns the url of the endpoint
* @return {String}
*/
App.Core.GUI.Endpoint.prototype.get_url = function() {
  return this.url;
};


/**
* returns the instance ready to be sent to React component
* @return {Object}
*/
App.Core.GUI.Endpoint.prototype.to_react = function() {
  return {
    'id' : this.id,
    'type' : this.type,
    'url' : this.url,
    'set_url' : this.set_url.bind(this)
  };
};


/**
* funcion returns the object for the output json file
* @return {Object}
*/
App.Core.GUI.Endpoint.prototype.to_json = function() {
  return {
    'id' : this.id,
    'type' : this.type,
    'url' : this.url
  };
};


/**
* Enum over HTTP requests
* @enum {String}
*/
App.Core.GUI.EndpointType = {
  POST: 'POST',
  GET: 'GET',
  OPTIONS: 'OPTIONS',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
