'use strict';

const shortid = require('shortid');
const EventEmitter = require('events');
const util = require('util');
const Rx = require('rx');

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
    attendee.on('change', this.onAttendeeChanged.bind(this));
    Rx.Observable.from(this.attendees).forEach(a => a.message('add', attendee));
    this.attendees.push(attendee);
  }

  onAttendeeChanged() {

  }
}

util.inherits(Game, EventEmitter);

module.exports = Game;
