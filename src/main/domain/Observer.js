'use strict';

/* globals require */
/* globals module */

var Attendee = require('./Attendee');

module.exports = class Player extends Attendee {
  constructor(user) {
    super(user);
  }
};
