'use strict';

const util = require('util');
const EventEmitter = require('events');

class Attendee {
  constructor(user) {
    EventEmitter.call(this);
    this.name = user.name;
  }

  /**
   * @param {String} type - join|leave|vote|clear
   * */
  message(type, data) {

  }
}

util.inherits(Attendee, EventEmitter);

module.exports = Attendee;
