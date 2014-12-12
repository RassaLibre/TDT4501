goog.require('App.Core.Property.Integer');

describe('App.Core.Property.Integer', function() {

  var property;

  beforeEach(function() {
    property = new App.Core.Property.Integer(4, 10);
  });

  it('should set the correct initial values', function() {
    expect(property.type).toBe('integer');
    expect(property.min).toBe(4);
    expect(property.max).toBe(10);
  });

  it('should return the object in json', function() {
    var result = property.to_json();
    expect(result).toEqual({type: 'integer', min: 4, max: 10});
  });

});
