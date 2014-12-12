goog.require('App.Core.GUI.Endpoint');
goog.require('App.Core.GUI.EndpointType');

describe('App.Core.GUI.Endpoint', function() {

  var endpoint;

  beforeEach(function() {
    endpoint =
        new App.Core.GUI.Endpoint(':01',
        App.Core.GUI.EndpointType.POST, 'user');
  });

  it('should set the right values in constructor', function() {
    expect(endpoint.type).toBe(App.Core.GUI.EndpointType.POST);
    expect(endpoint.url).toBe('user');
    expect(endpoint.id).toBe(':01');
  });

  it('should return type', function() {
    expect(endpoint.get_type()).toBe(App.Core.GUI.EndpointType.POST);
  });

  it('should return url', function() {
    expect(endpoint.get_url()).toBe('user');
  });

  it('should return id', function() {
    expect(endpoint.get_id()).toBe(':01');
  });

});
