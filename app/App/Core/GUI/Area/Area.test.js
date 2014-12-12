goog.require('App.Core.GUI.Area');
goog.require('App.Core.GUI.Association');
goog.require('App.Core.GUI.Model');
goog.require('goog.dom');
goog.require('goog.ui.IdGenerator');

describe('Area (App.Core.GUI.Area)', function() {

  var area, model1, model2, assoc, generator;
  var test_data = {
    name: 'User',
    endpoints: [
      {'type' : 'GET', 'url' : 'Users/'},
      {'type' : 'GET', 'url' : 'Users/:id'}
    ],
    properties: [
      {'length' : 20, 'name' : 'Name', 'regex' : 'A-Z', 'type' : 'string'},
      {'key' : 'string', 'name' : 'Emails', 'type' : 'array', 'value' : 'string'}
    ]
  };


  beforeEach(function() {
    generator = new goog.ui.IdGenerator();
    area = new App.Core.GUI.Area(goog.dom.createDom('div'), false, generator);
    model1 = new App.Core.GUI.Model(':1', 'Test', [], 10, 10, 30, 40);
    model2 = new App.Core.GUI.Model(':2', 'Test2', [], 200, 400, 30, 40);
    assoc = new App.Core.GUI.Association(':3', 'Relation1', model1, model2);
  });

  it('should add model to the collection', function() {
    expect(area.models.length).toBe(0);
    area.add_model(model1);
    expect(area.models.length).toBe(1);
  });

  it('should return if the model has a relations or not', function() {
    expect(area.has_relations(':1')).toBe(false);
    area.add_model(model1);
    area.add_model(model2);
    area.add_association(assoc);
    expect(area.has_relations(':1')).toBe(true);
  });

  it('should create a new model based on data from form', function() {
    expect(area.models.length).toBe(0);
    var result = area.model_created(test_data);
    expect(typeof result).toBe('object');
    expect(typeof result.model).toBe('object');
    expect(result.model.name).toBe(test_data.name);
    expect(Object.prototype.toString.call(result.model.properties)).toBe('[object Function]');
    expect(result.associations.length).toBe(0);
    expect(area.model_created({name: 'User'})).toBe(false);
    expect(area.models.length).toBe(1);
  });

  it('should create an association between models when adding new one with model property', function() {
    var test_data2 = {
      name: 'Account',
      endpoints: [],
      properties: [
        {'name' : 'User', 'type' : 'User'}
      ]
    };
    area.model_created(test_data);
    var result = area.model_created(test_data2);
    expect(result.associations.length).toBe(1);
    expect(area.associations.length).toBe(1);
    expect(area.associations[0].model1.name).toBe('Account');
    expect(area.associations[0].model2.name).toBe('User');
  });

  it('should add association when a property is array of model', function() {
    var test_data2 = {
      name: 'Account',
      endpoints: [],
      properties: [
        {'name' : 'User', 'type' : 'array', 'key' : 'string', 'value' : 'User'}
      ]
    };
    area.model_created(test_data);
    area.model_created(test_data2);
    expect(area.associations.length).toBe(1);
    expect(area.associations[0].model1.name).toBe('Account');
    expect(area.associations[0].model2.name).toBe('User');
  });

  it('should remove property from a model based on id', function() {
    //remove_property_from_model
    var added_model = area.model_created(test_data);
    area.remove_property_from_model(':0', ':1');
    expect(area.find_model(':0').properties.length).toBe(1);
    expect(area.find_model(':0').properties[0].id).not.toBe(':1');
  });

  it('should add property to a model specified my id', function() {
    //add_property_to_model
    var added_model = area.model_created(test_data);  //id - :0
    var property = {'name' : 'User', 'type' : 'User'};
    var returned_data = area.add_property_to_model(':0', property);
    expect(typeof returned_data.property).toBe('object');
    expect(returned_data.property.name).toBe(property.name);
    expect(returned_data.property.type).toBe(property.type);
    expect(returned_data.associations.length).toBe(1);
    expect(area.add_property_to_model(':1232', property)).toBe(false);
    //{property: Object{id: ':5', name: 'User', type: 'User', renamed: function () { ... }}, associations: [Object{id: ..., name: ..., renamed: ..., get_style_values: ..., styles: ...}]}
  });

  it('should return the association between two models', function() {
    area.add_model(model1);
    area.add_model(model2);
    area.add_association(assoc);
    var found_assoc = area.get_association_between(model1.get_id(), model2.get_id());
    expect(found_assoc).toBe(assoc);
    var found_assoc = area.get_association_between(model2.get_id(), model1.get_id());
    expect(found_assoc).toBe(assoc);
  });

  it('should remove association based on the passed id', function() {
    //remove_association
    area.add_model(model1);
    area.add_model(model2);
    area.add_association(assoc);
    expect(area.associations.length).toBe(1);
    area.remove_association(':3');
    expect(area.associations.length).toBe(0);
  });

  it('should add relation if property is array', function() {
    var added_model = area.model_created(test_data);  //id - :0
    var property = {'name' : 'User', 'type' : 'array', 'key' : 'string', 'value' : 'User'};
    var returned_data = area.add_property_to_model(':0', property);
    expect(typeof returned_data.property).toBe('object');
    expect(returned_data.property.name).toBe(property.name);
    expect(returned_data.associations.length).toBe(1);
  });

  it('should reject to create a model with invalida name', function() {
    area.add_model(model1);
    expect(area.is_valid_model_name('Tomas')).toBe(true);
    expect(area.is_valid_model_name('string')).toBe(false);
    expect(area.is_valid_model_name('Test')).toBe(false);
  });

  it('should remove the model from the collection', function() {
    area.add_model(model1);
    expect(area.models.length).toBe(1);
    expect(area.remove_model(':1')).toBe(true);
    expect(area.models.length).toBe(0);
    expect(area.remove_model(':1')).toBe(false);
  });

  it('should add association to the collection', function() {
    expect(area.associations.length).toBe(0);
    area.add_association(assoc);
    expect(area.associations.length).toBe(1);
  });

  it('should return the right model from the collection', function() {
    area.add_model(model1);
    area.add_model(model2);
    var found_model = area.find_model(':1');
    expect(found_model).toEqual(model1);
  });

  it('should change the model dimensions', function() {
    area.add_model(model1);
    area.add_model(model2);
    area.model_resized(':1', {width: 123, height: 456}, false);
    expect(model1.get_width()).toBe(123);
    expect(model1.get_height()).toBe(456);
  });

  it('should return models as an array of strings', function() {
    area.add_model(model1);
    area.add_model(model2);
    expect(area.models_to_property()).toEqual([{name: 'Test', id: ':1'},
          {name: 'Test2', id: ':2'}]);
  });

  it('should create a new model', function() {
    area.add_model(model1);
    area.add_model(model2);
    var current_model_length = area.models.length;
    var data = {name: 'Model3', properties: [{type: 'model1',
      name: 'tomas'}]};
    area.model_created(data);
    expect(area.models[area.models.length - 1].name).toBe('Model3');
    expect(area.models.length).toBe(current_model_length + 1);
    expect(area.models[area.models.length - 1].properties.length).toBe(1);
  });

});
