'use strict';

var Attendee = require('./Attendee');

module.exports = class Player extends Attendee {
  constructor(user) {
    super(user);
  }
};
