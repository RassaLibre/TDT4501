goog.require('App.Core.Property.Double');

describe('App.Core.Property.Double', function() {

  var property_type;

  beforeEach(function() {
    property_type = new App.Core.Property.Double(4, 10);
  });

  it('should set the correct values in constructor', function() {
    expect(property_type.min).toBe(4);
    expect(property_type.max).toBe(10);
    expect(property_type.type).toBe('double');
  });

  it('should return the object as json', function() {
    var result = property_type.to_json();
    expect(result).toEqual({'min' : 4, 'max' : 10, 'type' : 'double'});
  });

});
