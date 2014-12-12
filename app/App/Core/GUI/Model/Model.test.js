goog.require('App.Core.GUI.Model');
goog.require('App.Core.GUI.Property');
goog.require('App.Core.Property.String');

describe('Model (App.Core.GUI.Model)', function() {

  var model, property;

  beforeEach(function() {
    model = new App.Core.GUI.Model(1, 'Test', [], 10, 20, 30, 40);
    property = new App.Core.GUI.Property(2, 'Tomas',
        new App.Core.Property.String(10, '[A-Z]'));
  });

  it('should set right values in constructor', function() {
    var new_model = new App.Core.GUI.Model(4);
    expect(new_model.name).toBe('no name');
    expect(new_model.properties.length).toBe(0);
    expect(new_model.top).toBe(259);
    expect(new_model.left).toBe(687);
    expect(new_model.width).toBe(200);
    expect(new_model.height).toBe(200);
    expect(new_model.endpoints.length).toBe(0);
  });

  it('should return the ID', function() {
    expect(model.get_id()).toBe(1);
  });

  it('should return the top property', function() {
    expect(model.get_top()).toBe(10);
  });

  it('should return the left property', function() {
    expect(model.get_left()).toBe(20);
  });

  it('should set the top property and center in if needed', function() {
    model.set_top(15, false);
    expect(model.get_top()).toBe(15);
    model.set_top(200, true);
    expect(model.get_top()).toBe(180);
    model.set_top(10, true);
    expect(model.get_top()).toBe(0);
  });

  it('should set the left property and center in if needed', function() {
    model.set_left(15, false);
    expect(model.get_left()).toBe(15);
    model.set_left(200, true);
    expect(model.get_left()).toBe(185);
    model.set_left(10, true);
    expect(model.get_left()).toBe(0);
  });

  it('should return the right center point', function() {
    expect(model.calculate_center_point('top')).toEqual({top: 10, left: 35});
    expect(model.calculate_center_point('bottom')).toEqual({top: 50, left: 35});
    expect(model.calculate_center_point('left')).toEqual({top: 30, left: 20});
    expect(model.calculate_center_point('right')).toEqual({top: 30, left: 50});
  });

  it('should rename the model', function() {
    model.set_name('Tomas');
    expect(model.name).toBe('Tomas');
  });

  it('should add property to the properties array', function() {
    var current = model.properties.length;
    model.add_property(property);
    expect(model.properties.length).toBe(current + 1);
  });

  it('should return the name', function() {
    expect(model.get_name()).toBe('Test');
  });

});
