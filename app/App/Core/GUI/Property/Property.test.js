goog.require('App.Core.GUI.Property');
goog.require('App.Core.Property.String');

describe('Property (App.Core.GUI.Property)', function() {

  var property;
  var type;

  beforeEach(function() {
    type = new App.Core.Property.String(9, '[A-Z]');
    property = new App.Core.GUI.Property(':01', 'test', type);
  });

  it('should set correct properties in constructor', function() {
    expect(property.id).toBe(':01');
    expect(property.name).toBe('test');
    expect(property.type).toEqual(type);
  });

  it('should set new name', function() {
    property.set_name('tomas');
    expect(property.name).toBe('tomas');
  });

  it('should return id', function() {
    expect(property.get_id()).toBe(':01');
  });

});
