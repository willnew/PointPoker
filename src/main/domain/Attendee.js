'use strict';

const util = require('util');
const EventEmitter = require('events');
const shortid = require('shortid');

class Attendee {
  constructor(user) {
    EventEmitter.call(this);
    this.name = user.name;
    this.id = shortid.generate();
  }

  /**
   * @param {String} type - join|leave|vote|clear
   * */
  message(type, data) {
    
  }
}

util.inherits(Attendee, EventEmitter);

module.exports = Attendee;
