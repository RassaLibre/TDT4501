goog.require('App.Core.GUI.Association');
goog.require('App.Core.GUI.Model');

describe('Association (App.Core.GUI.Association)', function() {

  var assoc, model1, model2;

  beforeEach(function() {
    model1 = new App.Core.GUI.Model(1, 'Test', [], 10, 10, 30, 40);
    model2 = new App.Core.GUI.Model(2, 'Test2', [], 200, 400, 30, 40);
    assoc = new App.Core.GUI.Association(3, 'Testing', model1, model2);
  });

  it('should return the angle', function() {
    expect(assoc.get_angle()).toBe(24);
  });

  it('should set the right angle', function() {
    assoc.set_angle(-2);
    expect(assoc.get_angle()).toBe(0);
    assoc.set_angle(500);
    expect(assoc.get_angle()).toBe(360);
    assoc.set_angle(34);
    expect(assoc.get_angle()).toBe(34);
  });

  it('should return the models', function() {
    expect(assoc.get_model1()).toEqual(model1);
    expect(assoc.get_model2()).toEqual(model2);
  });

  it('should set the right position between models', function() {
    assoc.calculate_positions();
    expect(assoc.model1_position).toBe('bottom');
    expect(assoc.model2_position).toBe('left');

    assoc.set_model2(new App.Core.GUI.Model(2, 'Test2', [], 400, 10, 30, 40));
    assoc.calculate_positions();
    expect(assoc.model1_position).toBe('bottom');
    expect(assoc.model2_position).toBe('top');

    assoc.set_model1(new App.Core.GUI.Model(2, 'Test2', [], 10, 400, 30, 40));
    assoc.set_model2(new App.Core.GUI.Model(2, 'Test2', [], 10, 10, 30, 40));
    assoc.calculate_positions();
    expect(assoc.model1_position).toBe('left');
    expect(assoc.model2_position).toBe('right');

    assoc.set_model1(new App.Core.GUI.Model(2, 'Test2', [], 400, 10, 30, 40));
    assoc.set_model2(new App.Core.GUI.Model(2, 'Test2', [], 10, 10, 30, 40));
    assoc.calculate_positions();
    expect(assoc.model1_position).toBe('top');
    expect(assoc.model2_position).toBe('bottom');
  });

  it('should caluclate the right lenght between the models', function() {
    assoc.calculate_length();
    expect(assoc.get_length()).toBe(412);
    assoc.set_model2(new App.Core.GUI.Model(2, 'Test2', [], 342, 200, 30, 40));
    assoc.calculate_length();
    expect(assoc.get_length()).toBe(358);
  });

  it('should calculate the angle between models', function() {
    assoc.calculate_angle();
    expect(assoc.get_angle()).toBe(24);
    assoc.set_model2(new App.Core.GUI.Model(2, 'Test2', [], 43, 520, 30, 40));
    assoc.calculate_angle();
    expect(assoc.get_angle()).toBe(2);
  });

  it('should rename the association', function() {
    assoc.set_name('Tomas');
    expect(assoc.name).toBe('Tomas');
  });

});

