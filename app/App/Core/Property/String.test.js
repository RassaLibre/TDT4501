goog.require('App.Core.Property.String');

describe('App.Core.Property.String', function() {

  var property;

  beforeEach(function() {
    property = new App.Core.Property.String(10, '[A-Z]');
  });

  it('should set the initial properties', function() {
    expect(property.type).toBe('string');
    expect(property.length).toBe(10);
    expect(property.regex).toBe('[A-Z]');
  });

  it('should return the object in json', function() {
    var result = property.to_json();
    expect(result).toEqual({type: 'string', length: 10, regex: '[A-Z]'});
  });

});
