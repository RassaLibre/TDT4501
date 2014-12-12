goog.provide('App');
goog.provide('App.init');

goog.require('App.Core');
goog.require('App.Core.GUI.Area');
goog.require('App.Core.GUI.Association');
goog.require('App.Core.GUI.ControlPanel');
goog.require('App.Core.GUI.Endpoint');
goog.require('App.Core.GUI.EndpointType');
goog.require('App.Core.GUI.Model');
goog.require('App.Core.GUI.Property');
goog.require('App.Core.Property.Array');
goog.require('App.Core.Property.Double');
goog.require('App.Core.Property.Geojson');
goog.require('App.Core.Property.Integer');
goog.require('App.Core.Property.String');
goog.require('App.Core.Property.Timestamp');
goog.require('App.Core.Property.Universal');
goog.require('App.UIC.Panel');


/**
*   This is where all the application components get loaded
*/
App.init = function() {

  //because every element on the Canvas has to be marked with an unique ID
  var generator = {
    next_id: 0,
    getNextUniqueId: function() {
      this.next_id++;
      return ':' + this.next_id;
    }
  };

  // ---------------- create dummy data ---------------------

  //OVEN
  var property = new App.Core.Property.String(30, '[A-Z]{2,30}');
  var model1 = new App.Core.GUI.Model(generator.getNextUniqueId(), 'Oven', [],
      12, 315);
  model1.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'SKU', new App.Core.Property.String(30, '^[A-Z1-9]{2}-[A-Z1-9]{2}$')));
  model1.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'name', new App.Core.Property.String(30)));
  model1.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'parts', new App.Core.Property.Array('integer', 'Part')));
  model1.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'status', new App.Core.Property.String(30)));
  model1.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'createdAt', new App.Core.Property.Timestamp()));
  model1.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'updatedAt', new App.Core.Property.Timestamp()));
  model1.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'location', new App.Core.Property.Universal('Location')));

  //PALLET
  var model2 = new App.Core.GUI.Model(generator.getNextUniqueId(), 'Pallet', [],
      400, 800);
  model2.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'SKU', new App.Core.Property.String(30, '^[A-Z1-9]{2}-[A-Z1-9]{2}$')));
  model2.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'parts', new App.Core.Property.Array('integer', 'Part')));
  model2.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'location', new App.Core.Property.Universal('Location')));
  model2.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'createdAt', new App.Core.Property.Timestamp()));
  model2.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'updatedAt', new App.Core.Property.Timestamp()));

  //LOCATION
  var model3 = new App.Core.GUI.Model(generator.getNextUniqueId(), 'Location',
      [], 400, 313);
  model3.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'SKU', new App.Core.Property.String(30, '[A-Z]{1}[1-9]{2}-[1-9]{2}$')));
  model3.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'name', new App.Core.Property.String(30)));
  model3.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'geoLocation', new App.Core.Property.Geojson()));
  model3.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'createdAt', new App.Core.Property.Timestamp()));
  model3.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'updatedAt', new App.Core.Property.Timestamp()));

  //PART
  var model4 = new App.Core.GUI.Model(generator.getNextUniqueId(), 'Part', [],
      16, 786);
  model4.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'SKU', new App.Core.Property.String(30,
      '^[1-9]{2}-[A-Z1-9]{2}-[A-Z1-9]{2}$')));
  model4.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'name', new App.Core.Property.String(30)));
  model4.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'count', new App.Core.Property.Integer(0)));
  model4.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'price', new App.Core.Property.Double(0)));
  model4.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'value', new App.Core.Property.Double(0)));
  model4.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'createdAt', new App.Core.Property.Timestamp()));
  model4.add_property(new App.Core.GUI.Property(generator.getNextUniqueId(),
      'updatedAt', new App.Core.Property.Timestamp()));

  //ASSOCIATIONS
  var assoc = new App.Core.GUI.Association(generator.getNextUniqueId(),
      'lays on', model4, model2);
  var assoc2 = new App.Core.GUI.Association(generator.getNextUniqueId(),
      'made out of', model1, model4);
  var assoc3 = new App.Core.GUI.Association(generator.getNextUniqueId(),
      'positioned at', model2, model3);
  var assoc4 = new App.Core.GUI.Association(generator.getNextUniqueId(),
      'positioned at', model1, model3);

  //ENDPOINTS
  model1.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'ovens/'));
  model1.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'ovens/:id'));
  model1.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.PUT, 'ovens/:id'));
  model1.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.DELETE, 'ovens/:id'));
  model1.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.POST, 'ovens/'));

  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'pallets/'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'pallets/:id'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.PUT, 'pallets/:id'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.DELETE, 'pallets/:id'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.POST, 'pallets/'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.POST, 'pallets/:id/parts'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'pallets/:id/parts'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'pallets/:id/parts/:part_id'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.PUT, 'pallets/:id/parts/:part_id'));
  model2.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.DELETE, 'pallets/:id/parts/:part_id'));

  model3.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'locations/'));
  model3.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'locations/:id'));
  model3.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.PUT, 'locations/:id'));
  model3.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.DELETE, 'locations/:id'));
  model3.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.POST, 'locations/'));

  model4.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'parts/'));
  model4.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'parts/:id'));
  model4.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.PUT, 'parts/:id'));
  model4.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.DELETE, 'parts/:id'));
  model4.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.POST, 'parts/'));
  model4.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.GET, 'parts/:id/pallets'));
  model4.add_endpoint(new App.Core.GUI.Endpoint(generator.getNextUniqueId(),
      App.Core.GUI.EndpointType.POST, 'parts/:id/pallets'));


  // --------------------------------------------------------

  //generate the whole canvas
  var canvas_envelope = document.getElementById('canvas_envelope');
  canvas_envelope.style.height = window.innerHeight + 'px';
  canvas_envelope.style.width = window.innerWidth + 'px';

  //create area object
  var area = new App.Core.GUI.Area(canvas_envelope, false, generator);
  area.add_model(model1);
  area.add_model(model2);
  area.add_model(model3);
  area.add_model(model4);
  area.add_association(assoc);
  area.add_association(assoc2);
  area.add_association(assoc3);
  area.add_association(assoc4);
  area.generate_UI_component();
};
