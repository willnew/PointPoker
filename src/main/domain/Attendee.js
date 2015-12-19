'use strict';

const util = require('util');
const EventEmitter = require('events');

class Attendee {
  constructor(user) {
    EventEmitter.call(this);
    this.name = user.name;
  }
}

util.inherits(Attendee, EventEmitter);

module.exports = Attendee;
