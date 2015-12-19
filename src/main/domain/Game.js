'use strict';

const shortid = require('shortid');
const EventEmitter = require('events');
const util = require('util');

class Game {
  constructor() {
    EventEmitter.call(this);
    this.id = shortid.generate();
    this.attendees = [];
  }

  /**
   * Add attendee to the attendee list
   *
   * @param {Attendee} attendee
   * */
  add(attendee) {
    this.attendees.push(attendee);
    attendee.on('change', this.onAttendeeChanged.bind(this));
  }

  onAttendeeChanged() {

  }
}

util.inherits(Game, EventEmitter);

module.exports = Game;
