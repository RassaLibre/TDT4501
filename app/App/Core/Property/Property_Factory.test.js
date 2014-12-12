goog.require('App.Core.Property.Propety_Factory');

describe('App.Core.Property.Propety_Factory', function() {

  var factory;

  beforeEach(function() {
    factory = new App.Core.Property.Propety_Factory();
  });

  it('should return the right instance', function() {
    factory.set_data({});
    expect(factory.get_instance()).toBe(null);
    factory.set_data({type: ''});
    expect(factory.get_instance()).toBe(null);
    //test integer
    factory.set_data({type: 'integer', min: 9, max: 10});
    var res = factory.get_instance();
    expect(res.type).toBe('integer');
    expect(res.min).toBe(9);
    expect(res.max).toBe(10);
    expect(res instanceof App.Core.Property.Integer).toBe(true);
    //test string
    factory.set_data({type: 'string', length: 9, regex: '[A-Z]'});
    var res = factory.get_instance();
    expect(res.type).toBe('string');
    expect(res.length).toBe(9);
    expect(res.regex).toBe('[A-Z]');
    expect(res instanceof App.Core.Property.String).toBe(true);
    //test double
    factory.set_data({type: 'double', min: 9, max: 20});
    var res = factory.get_instance();
    expect(res.type).toBe('double');
    expect(res.min).toBe(9);
    expect(res.max).toBe(20);
    expect(res instanceof App.Core.Property.Double).toBe(true);
    //test universal
    factory.set_data({type: 'model1'});
    var res = factory.get_instance();
    expect(res.type).toBe('model1');
    expect(res instanceof App.Core.Property.Universal).toBe(true);

  });

});
