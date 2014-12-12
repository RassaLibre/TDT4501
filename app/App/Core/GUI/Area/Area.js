goog.provide('App.Core.GUI.Area');

goog.require('App.Core.GUI.Association');
goog.require('App.Core.GUI.Endpoint');
goog.require('App.Core.GUI.EndpointType');
goog.require('App.Core.GUI.Model');
goog.require('App.Core.GUI.Property');
goog.require('App.Core.Property.Propety_Factory');
goog.require('App.UIC.Area');



/**
*   Object representation of the area for drawing model
*   @param {Object} parent_element element to which canvas will be rendered
*   @param {Bool} generate is the UI component going to be generated?
*   @param {goog.ui.IdGenerator} generator
*   @constructor
*/
App.Core.GUI.Area = function(parent_element, generate, generator) {
  this.models = [];                     //array of models in the area
  this.associations = [];               //array of associations in the area
  this.parent_element = parent_element; //parent element of component
  this.component = null;                //UI component itseld
  this.component_x = 0;               //TODO: needs to be calculated (350)
  this.component_y = 0;                //TODO: needs to be calculated (50)
  this.generator = generator;           //generator of unique IDs
  if (generate) this.generate_UI_component();
};


/**
* Function renders the Area component to the parent element
*/
App.Core.GUI.Area.prototype.generate_UI_component = function() {
  this.component = React.renderComponent(App.UIC.Area(
      {
        'models' : this.models_to_react.bind(this),
        'model_drop' : this.model_dropped.bind(this),
        'model_resize' : this.model_resized.bind(this),
        'property_remove' : this.remove_property_from_model.bind(this),
        'associations' : this.associations_to_react.bind(this),
        'add_model' : this.model_created.bind(this),
        'model_property_types' : this.models_to_property(),
        'update_associations_of_model' :
            this.update_associations_of_model.bind(this),
        'remove_model' : this.remove_model.bind(this),
        'has_relations' : this.has_relations.bind(this),
        'add_property_to_model' : this.add_property_to_model.bind(this),
        'add_endpoint_to_model' : this.add_endpoint_to_model.bind(this),
        'to_json' : this.to_json.bind(this)
      }), this.parent_element);
};


/**
* Adds a model into the array of models
* @param {App.Core.GUI.Model} model
*/
App.Core.GUI.Area.prototype.add_model = function(model) {
  this.models.push(model);
};


/**
* Removes model from the collection if. If the model has an association
* to another model, it can not be removed.
* @param {String} model_id id of a model to be deleted
* @return {Boolean} removed?
*/
App.Core.GUI.Area.prototype.remove_model = function(model_id) {
  for (var i = 0; i < this.models.length; i++) {
    if (this.models[i].get_id() === model_id) {
      this.models.splice(i, 1);
      return true;
    }
  }
  return false;
};


/**
* function checks if the model has any relations by looping over associations
* and if any of the models in the association has the same id as the given
* model, function returns true. otherwise it returns false
* @param {String} id
* @return {Bool}
*/
App.Core.GUI.Area.prototype.has_relations = function(id) {
  if (this.associations.length > 0) {
    for (var i = 0; i < this.associations.length; i++) {
      if (this.associations[i].get_model1().get_id() === id) return true;
      if (this.associations[i].get_model2().get_id() === id) return true;
    }
  }
  return false;
};


/**
* function adds new association to the associations array
* @param {App.Core.GUI.Association} association
*/
App.Core.GUI.Area.prototype.add_association = function(association) {
  this.associations.push(association);
};


/**
* function searches in the associations and if the one with passed id is found
* it gets deleted
* @param {String} assoc_id
*/
App.Core.GUI.Area.prototype.remove_association = function(assoc_id) {
  if (this.associations.length > 0) {
    for (var i = 0; i < this.associations.length; i++) {
      if (this.associations[i].get_id() === assoc_id) {
        this.associations.splice(i, 1);
      }
    }
  }
};


/**
* Function receives an data object containing information about the new model
* and so it can create this model. Once the model is created, check
* if any properties are specified and if so, create them and add them to the
* model. If endpoints are specified, create them and add them too.
* Then add the model to the collection and regenerate the UI.
* TODO: check if the model has an unique name
* TODO: check if the model is not named string,integer,array,double
* @param {Object} form_data
* @return {Object}
*/
App.Core.GUI.Area.prototype.model_created = function(form_data) {
  var to_be_returned = {model: null, associations: []};
  console.log(form_data);
  //of the name of the model is not valid, do not do anything futher
  if (!this.is_valid_model_name(form_data.name)) return false;
  //create a new model instance
  var model = new App.Core.GUI.Model(this.generator.getNextUniqueId(),
      form_data.name, []);
  this.add_model(model);
  //generate and add properties
  if (form_data.properties && form_data.properties.length > 0) {
    var prop_type_factory = new App.Core.Property.Propety_Factory();
    for (var i = 0; i < form_data.properties.length; i++) {
      var res = this.add_property_to_model(model.get_id(),
          form_data.properties[i]);
      //if some associations has been created, add them to return variable
      if (res.associations) {
        to_be_returned.associations = to_be_returned.associations.concat(
            res.associations);
      }
    }
  }
  //if there are any endpoints specified, add them to the model
  if (form_data.endpoints && form_data.endpoints.length > 0) {
    for (var i = 0; i < form_data.endpoints.length; i++) {
      model.add_endpoint(new App.Core.GUI.Endpoint(
          this.generator.getNextUniqueId(), form_data.endpoints[i].type,
          form_data.endpoints[i].url));
    }
  }
  //add the model to the collection
  to_be_returned.model = model.to_react();
  return to_be_returned;
};


/**
* the function checks if the model name is valid. it first checks if the model
* name is unique and then if it is not one of the keywords
* @param {String} name
* @return {Bool}
*/
App.Core.GUI.Area.prototype.is_valid_model_name = function(name) {
  var models = this.get_array_of_model_names();
  if (models.indexOf(name) !== -1) return false;
  else {
    if ((name === 'string') || (name === 'integer') ||
        (name === 'array') || (name === 'double')) {
      return false;
    }
    else return true;
  }
};


/**
* Exports all stored models ready for React Components
* @return {Array}
*/
App.Core.GUI.Area.prototype.models_to_react = function() {
  if (this.models.length === 0) return [];
  var to_be_returned = [];
  for (var i = 0; i < this.models.length; i++) {
    to_be_returned.push(this.models[i].to_react());
  }
  return to_be_returned;
};


/**
* creates an association between the two passed models
* @param {App.Core.GUI.Model} model1
* @param {App.Core.GUI.Model} model2
# @return {App.Core.GUI.Association}
*/
App.Core.GUI.Area.prototype.create_assoc_between = function(model1, model2) {
  var new_assoc = new App.Core.GUI.Association(
      this.generator.getNextUniqueId(),
      model1.get_name() + ' containes ' + model2.get_name(),
      model1, model2);
  this.add_association(new_assoc);
  return new_assoc;
};


/**
* returns the whole model in JSON for export
* @return {String}
*/
App.Core.GUI.Area.prototype.to_json = function() {
  var to_be_returned = {models: [], associations: []};
  if (this.models.length > 0) {
    for (var i = 0; i < this.models.length; i++) {
      to_be_returned.models.push(this.models[i].to_json());
    }
  }
  if (this.associations.length > 0) {
    for (var i = 0; i < this.associations.length; i++) {
      to_be_returned.associations.push(this.associations[i].to_json());
    }
  }
  return JSON.stringify(to_be_returned, undefined, 2);
};


/**
* function loop over all available models and creates an array of them
* so they can be used as a property type when creating new model. If such model
* is selected as a property type, then a new association is created
* @return {Array}
*/
App.Core.GUI.Area.prototype.models_to_property = function() {
  var to_be_returned = [];
  for (var i = 0; i < this.models.length; i++) {
    to_be_returned.push({name: this.models[i].get_name(),
      id: this.models[i].get_id()});
  }
  return to_be_returned;
};


/**
* function loops over all the models and returns an array of their names
* @return {Array} for example ['model1','model2','model3']
*/
App.Core.GUI.Area.prototype.get_array_of_model_names = function() {
  var to_be_returned = [];
  for (var i = 0; i < this.models.length; i++) {
    to_be_returned.push(this.models[i].get_name());
  }
  return to_be_returned;
};


/**
*
* @param {String} model_id id of the model to which the property should be added
* @param {Object} property_form_data object with collected data from the
*                 form for adding property
* @return {Object|Boolean}
*/
App.Core.GUI.Area.prototype.add_property_to_model = function(model_id,
    property_form_data) {
  var to_be_returned = {property: null, associations: []};
  //find the model based on id
  var found_model = this.find_model(model_id);
  if (found_model) {
    var prop_type_factory = new App.Core.Property.Propety_Factory();
    prop_type_factory.set_data(property_form_data);
    //get the right property type
    var prop_type_obj = prop_type_factory.get_instance();
    //create the new property
    var new_property = new App.Core.GUI.Property(
        this.generator.getNextUniqueId(), property_form_data.name,
        prop_type_obj);
    found_model.add_property(new_property);
    //if the property is a model, create an association between these
    if (prop_type_obj instanceof App.Core.Property.Universal) {
      //find the model based on the name in the property type
      var searched_model = this.find_model_based_on_name(
          prop_type_obj.get_type());
      if (searched_model) {
        var new_assoc = this.create_assoc_between(found_model, searched_model);
        to_be_returned.associations.push(new_assoc.to_react());
      }
    }
    //array can also have a value of model so we need to check it and if so
    //we need to create a new association between those two models
    if (prop_type_obj instanceof App.Core.Property.Array) {
      var array_value_type = prop_type_obj.get_value();
      //if the array value type is a model, create an association
      if (this.get_array_of_model_names().indexOf(array_value_type) != -1) {
        var searched_model = this.find_model_based_on_name(array_value_type);
        if (searched_model) {
          var new_assoc = this.create_assoc_between(found_model,
              searched_model);
          to_be_returned.associations.push(new_assoc.to_react());
        }
      }
    }
    to_be_returned.property = new_property.to_react();
    //since this action affects the size of the entitiy an update of the
    return to_be_returned;
  }
  else return false;
};


/**
* removes a property form a model and then updates the view
* @param {String} model_id
* @param {String} prop_id
* @return {Object}
*/
App.Core.GUI.Area.prototype.remove_property_from_model =
    function(model_id, prop_id) {
  var to_be_returned = {association: {}};
  var found_model = this.find_model(model_id);
  if (found_model) {
    var found_property = found_model.get_property(prop_id);
    if (found_property) {
      var prop_type = found_property.get_type();
      //if the property type is a model, an association needs to be removed
      if ((prop_type instanceof App.Core.Property.Universal) ||
          (prop_type instanceof App.Core.Property.Array)) {
        var second_model = (prop_type instanceof App.Core.Property.Universal) ?
            this.find_model_based_on_name(prop_type.get_type()) :
            this.find_model_based_on_name(prop_type.get_value());
        if (second_model) {
          var found_assoc = this.get_association_between(found_model.get_id(),
              second_model.get_id());
          if (found_assoc) {
            to_be_returned.association = found_assoc.to_react();
            this.remove_association(found_assoc.get_id());
          }
        }
      }
    }
    found_model.remove_property(prop_id);
    //update relations because properties affecting the size of the model
    //therefor associations need to recalculated
    this.update_associations_of_model(found_model);
    return to_be_returned;
  }
};


/**
* function gets two model ids and tries to find the association between
* these two models. If no assoc is found, null is returned
* @param {String} model1_id
* @param {String} model2_id
* @return {?App.Core.GUI.Property}
*/
App.Core.GUI.Area.prototype.get_association_between =
    function(model1_id, model2_id) {
  if (this.associations.length > 0) {
    for (var i = 0; i < this.associations.length; i++) {
      if ((this.associations[i].get_model1().get_id() === model1_id) &&
          (this.associations[i].get_model2().get_id() === model2_id)) {
        return this.associations[i];
      }
      if ((this.associations[i].get_model1().get_id() === model2_id) &&
          (this.associations[i].get_model2().get_id() === model1_id)) {
        return this.associations[i];
      }
    }
  }
  else return null;
};


/**
* Function receives id of a model and a data collected from the property form
* and it creates the endpoint, adds it to the model and return the endpoint
* ready to by shown by UI
* @param {String} model_id
* @param {Object} endpoint_form_data
* @return {Object|Boolean} UI ready form of the model
*/
App.Core.GUI.Area.prototype.add_endpoint_to_model = function(model_id,
    endpoint_form_data) {
  var found_model = this.find_model(model_id);
  if (found_model) {
    var new_endpoint = new App.Core.GUI.Endpoint(
        this.generator.getNextUniqueId(), endpoint_form_data.type,
        endpoint_form_data.url);
    found_model.add_endpoint(new_endpoint);
    return new_endpoint.to_react();
  }
  else return false;
};


/**
* function returns array of associations ready for React Components
* @return {Array}
*/
App.Core.GUI.Area.prototype.associations_to_react = function() {
  if (this.associations.length === 0) return [];
  var to_be_returned = [];
  for (var i = 0; i < this.associations.length; i++) {
    to_be_returned.push(this.associations[i].to_react());
  }
  return to_be_returned;
};


/**
* function returns model based on id
* @param {String} id id of the model
* @return {?App.Core.GUI.Model}
*/
App.Core.GUI.Area.prototype.find_model = function(id) {
  if (this.models.length === 0) return null;
  var to_be_returned = null;
  for (var i = 0; i < this.models.length; i++) {
    if (this.models[i].get_id() === id) to_be_returned = this.models[i];
  }
  return to_be_returned;
};


/**
* finds a model with the matching name and returns it
* @param {String} name
* @return {?App.Core.GUI.Model}
*/
App.Core.GUI.Area.prototype.find_model_based_on_name = function(name) {
  if (this.models.length === 0) return null;
  var to_be_returned = null;
  for (var i = 0; i < this.models.length; i++) {
    if (this.models[i].get_name() === name) to_be_returned = this.models[i];
  }
  return to_be_returned;
};


/**
* Function gets a model, finds all associations which this model is involved in
* and updates the css values such as length and angle in this associations
* @param {App.Core.GUI.Model|String} model object or its id
* @return {Array}
*/
App.Core.GUI.Area.prototype.update_associations_of_model = function(model) {
  if (typeof model === 'string') model = this.find_model(model);
  var to_be_returned = [];
  if (this.associations.length > 0) {
    for (var i = 0; i < this.associations.length; i++) {
      if ((model.get_id() === this.associations[i].get_model1().get_id()) ||
          (model.get_id() === this.associations[i].get_model2().get_id())) {
        var recalculated = this.associations[i].recalculate_values();
        to_be_returned.push({id: this.associations[i].get_id(),
          styles: recalculated});
      }
    }
  }
  return to_be_returned;
};


/**
* When a model is dropped somewhere in the Area, this function is triggered
* to reset the position of the element in the business logic and re-render
* the area.
* For precise positioning first the current model positon is taken and the
* defference with the mouse position in the time of drag is calculated.
* Then the difference is subtracted from the new position so the model is
* placed in respect of the position where it was dragged
* @param {Object} drag_info information about the drag
* @param {Object} drop_info information about drop
* @return {Object}
*/
App.Core.GUI.Area.prototype.model_dropped = function(drag_info, drop_info) {
  var model_instance = this.find_model(drag_info.id);
  var client_model_x = model_instance.get_left() + this.component_x;
  var client_model_y = model_instance.get_top() + this.component_y;
  var difference_x = drag_info.mouse_x - client_model_x;
  var difference_y = drag_info.mouse_y - client_model_y;
  var new_x = drop_info.x - difference_x - this.component_x;
  var new_y = drop_info.y - difference_y - this.component_y;
  model_instance.set_top(new_y, false);
  model_instance.set_left(new_x, false);
  return {x: new_x, y: new_y};
};


/**
* function is passed to the react component and it is called everytime there is
* a posibility that model could have changed its size. This size needs to be
* updated in the business logic, because there are calculations dependent on
* the models height and width (for instance calculations of relations)
* @param {String} id
* @param {Object <String,Integer>} dimensions
* @param {Boolean} rerender
*/
App.Core.GUI.Area.prototype.model_resized = function(id, dimensions, rerender) {
  var found_model = this.find_model(id);
  if (found_model) {
    found_model.set_height(dimensions.height);
    found_model.set_width(dimensions.width);
    this.update_associations_of_model(found_model);
  }
};


/**
* Setter for the UI component
* @param {App.UIC.Area} area_component
*/
App.Core.GUI.Area.prototype.set_component = function(area_component) {
  this.component = area_component;
};
