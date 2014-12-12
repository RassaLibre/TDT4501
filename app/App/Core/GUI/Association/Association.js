goog.provide('App.Core.GUI.Association');



/**
* Class represents a connection between two classes in the Area
* @param {Integer} id unique identifier in the Area
* @param {String} name
* @param {App.Core.GUI.Model} model1
* @param {App.Core.GUI.Model} model2
* @constructor
*/
App.Core.GUI.Association = function(id, name, model1, model2) {
  this.id = id;
  this.name = name;
  this.model1 = model1;
  this.model2 = model2;
  this.angle = 0;
  this.length = 0;
  this.model1_position = '';
  this.model2_position = '';
  this.calculate_positions(); //get the facing sides of the models
  this.calculate_length();    //get the length of the association
  this.calculate_angle();     //get the angle of the association
};


/**
* Set the angle between classes
* @param {Integer} new_angle
*/
App.Core.GUI.Association.prototype.set_angle = function(new_angle) {
  if (new_angle > 360) this.angle = 360;
  else if (new_angle < 0) this.angle = 0;
  else this.angle = new_angle;
};


/**
* function returns model1
* @return {App.Core.GUI.Model}
*/
App.Core.GUI.Association.prototype.get_model1 = function() {
  return this.model1;
};


/**
* function returns the id
* @return {String}
*/
App.Core.GUI.Association.prototype.get_id = function() {
  return this.id;
};


/**
* Sets new model1
* @param {App.Core.GUI.Model} new_model
*/
App.Core.GUI.Association.prototype.set_model1 = function(new_model) {
  this.model1 = new_model;
};


/**
* function returns model2
* @return {App.Core.GUI.Model}
*/
App.Core.GUI.Association.prototype.get_model2 = function() {
  return this.model2;
};


/**
* Sets new model2
* @param {App.Core.GUI.Model} new_model
*/
App.Core.GUI.Association.prototype.set_model2 = function(new_model) {
  this.model2 = new_model;
};


/**
* Returns angle between model1 and model2
* @this{App.Core.GUI.Association}
* @return {Integer}
*/
App.Core.GUI.Association.prototype.get_angle = function() {
  return this.angle;
};


/**
* Returns length of the association
* @this{App.Core.GUI.Association}
* @return {Integer}
*/
App.Core.GUI.Association.prototype.get_length = function() {
  return this.length;
};


/**
* sets a new name to the instance
* @param {String} name
*/
App.Core.GUI.Association.prototype.set_name = function(name) {
  this.name = name;
};


/**
* function calculates the length of the association between model1 and model2
* and stores it in param length
* Pythagoras Sentence is used to calculate the length
*/
App.Core.GUI.Association.prototype.calculate_length = function() {
  if (!this.model1_position || !this.model2_position)
    this.calculate_positions();
  var model1_center_point = this.model1.calculate_center_point(
      this.model1_position);
  var model2_center_point = this.model2.calculate_center_point(
      this.model2_position);
  var top_distance = Math.abs(model1_center_point.top -
      model2_center_point.top);
  var left_distance = Math.abs(model1_center_point.left -
      model2_center_point.left);
  var square_length = top_distance * top_distance +
      left_distance * left_distance;
  this.length = Math.round(Math.sqrt(square_length));
};


/**
* function calculates the angle of the association between model1 and model2
* model1 is taken as a start so the angle can be between 0 to 360
* this should be adjusted so the angle is only between 0 and 180 and then it
* switches the beginning point. If so, the text will not be upside down
*/
App.Core.GUI.Association.prototype.calculate_angle = function() {
  if (!this.length) this.calculate_length();
  var model1_center_point = this.model1.calculate_center_point(
      this.model1_position);
  var model2_center_point = this.model2.calculate_center_point(
      this.model2_position);
  var top_distance = model1_center_point.top -
      model2_center_point.top;
  var left_distance = model1_center_point.left -
      model2_center_point.left;
  var alfa_rad = Math.asin(Math.abs(top_distance) / this.length);
  var alfa_deg = Math.round(alfa_rad * (180 / Math.PI));
  if (top_distance < 0) { //model1 is above model2
    if (left_distance > 0) this.angle = 180 - alfa_deg; //model2 left under
    else this.angle = alfa_deg; //model2 right under
  }
  else {   //model2 is above model1
    if (left_distance > 0) this.angle = 180 + alfa_deg; //model2 left top
    else this.angle = 360 - alfa_deg; //model2 right top
  }
};


/**
* Function calculates which SIDES of the models are FACING TO EACH OTHER
* and then saves it to the parameters model1_position and model2_position
* this is needed because if there is a association, the association has to
* know which two sides of the models are facing each other in order to get
* center points of the sides
* 1 2 3
* 8 M 4
* 7 6 5
*/
App.Core.GUI.Association.prototype.calculate_positions = function() {
  //testing on 1 8 7
  if (this.model1.get_left() + this.model1.get_width() < this.model2.get_left())
  {
    if (this.model1.get_top() + this.model1.get_height() <
        this.model2.get_top()) {  //testing on 1
      this.model1_position = 'bottom';
    }
    else if (this.model1.get_top() >
        this.model2.get_top() + this.model2.get_height()) { //testing on 7
      this.model1_position = 'top';
    }
    else this.model1_position = 'right';  //otherwise 8
    this.model2_position = 'left';
  }
  //testing on 1 2 3
  else if (this.model1.get_top() + this.model1.get_height() <
      this.model2.get_top()) {
    if (this.model1.get_left() + this.model1.get_width() <
        this.model2.get_left()) {    //testing on 1
      this.model2_position = 'left';
    }
    else if (this.model1.get_left() >
        this.model2.get_left() + this.model2.get_width()) {  //testing on 3
      this.model2_position = 'right';
    }
    else this.model2_position = 'top';  //otherwise 2
    this.model1_position = 'bottom';
  }
  //testing on 3 4 5
  else if (this.model2.get_left() + this.model2.get_width() <
      this.model1.get_left()) {
    if (this.model1.get_top() + this.model1.get_height() <
        this.model2.get_top()) { //testing on 3
      this.model1_position = 'bottom';
    }
    else if (this.model1.get_top() >
        this.model2.get_top() + this.model2.get_height()) {  //testing on 5
      this.model1_position = 'top';
    }
    else this.model1_position = 'left'; //otherwise 4
    this.model2_position = 'right';
  }
  else {  //testing on 7 6 5
    if (this.model1.get_left() + this.model1.get_width() <
        this.model2.get_left()) {  //testing on 7
      this.model2_position = 'left';
    }
    else if (this.model1.get_left() >
        this.model2.get_left() + this.model2.get_width()) {  //testing on 5
      this.model2_position = 'right';
    }
    else this.model2_position = 'bottom'; //otherwise 6
    this.model1_position = 'top';
  }
};


/**
* function returns data of the association ready to be pushed into React comp.
* @return {Object}
*/
App.Core.GUI.Association.prototype.to_react = function() {
  return {
    'id' : this.id,
    'name' : this.name,
    'renamed' : this.set_name.bind(this),
    'get_style_values' : this.get_style_values.bind(this),
    'styles' : this.get_style_values()
  };
};


/**
* returns the property in the JSON format ready to be computed by backend
* @return {Object}
*/
App.Core.GUI.Association.prototype.to_json = function() {
  return {
    'id' : this.id,
    'name' : this.name,
    'model1' : {
      'name' : this.model1.get_name(),
      'id' : this.model1.get_id()
    },
    'model2' : {
      'name' : this.model2.get_name(),
      'id' : this.model2.get_id()
    }
  };
};


/**
* returns style values
* @return {Object}
*/
App.Core.GUI.Association.prototype.get_style_values = function() {
  return {
    'width' : this.length,
    '-webkit-transform' : 'rotate(' + this.angle + 'deg)',
    'top' : this.model1.calculate_center_point(
        this.model1_position).top - 15, // - 25 because that is the rel. wid.
    'left' : this.model1.calculate_center_point(
        this.model1_position).left
  };
};


/**
* function updates the main values of the relation
* this function is called for example when a model which is involved
* in this relation moves, then it is neccesarry to recalculate all the values
* and re-render the UI component
* @return {Object}
*/
App.Core.GUI.Association.prototype.recalculate_values = function() {
  this.calculate_positions();
  this.calculate_length();
  this.calculate_angle();
  return this.get_style_values();
};
