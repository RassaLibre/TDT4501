goog.require('App.Core.Property.Universal');

describe('App.Core.Property.Universal', function() {

  var property;

  beforeEach(function() {
    property = new App.Core.Property.Universal('model1');
  });

  it('should set the initial properties', function() {
    expect(property.type).toBe('model1');
  });

  it('should return the object in json', function() {
    var result = property.to_json();
    expect(result).toEqual({type: 'model1'});
  });

  it('should return type of the object', function() {
    expect(property.get_type()).toBe('model1');
  });

});
