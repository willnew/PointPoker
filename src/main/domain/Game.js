'use strict';

const shortid = require('shortid');
const EventEmitter = require('events');
const util = require('util');
const Rx = require('rx');
const Attendee = require('./Attendee');
const _ = require('underscore');

class Game {
  constructor() {
    EventEmitter.call(this);
    this.id = shortid.generate();
    this.attendees = [];
  }

  /**
   * Add attendee to the attendee list
   * @param {Attendee} attendee
   * */
  add(attendee) {
    attendee.on('change', this.broadcastAttendeeChanged.bind(this));
    Rx.Observable.from(this.attendees).forEach(a => a.message('add', attendee));
    this.attendees.push(attendee);
    return this;
  }

  /**
   * Remove attendee from attendee list
   * @param {Attendee|String} [attendee]
   * @example
   * remove(player)
   * @example
   * remove('DDS21')
   * */
  remove(attendee) {
    if (attendee instanceof Attendee) {
      this.attendees.splice(this.attendees.indexOf(attendee), 1);  
      attendee.removeAllListeners('change');
    } else if (typeof attendee === 'string') {
      this.remove(this.find(attendee));
    }
  }

  /**
   * Find an attendee by id
   * */
  find(attendeeId) {
    return _.findWhere(this.attendees, { id: attendeeId });
  }

  /**
   * @param {Object} msg
   * @param {Object} msg.id - the dispatcher id of the message
   * */
  broadcastAttendeeChanged(msg) {
    if (!msg) return;
    _.chain(this.attendees)
      .filter(attendee => attendee.id !== msg.id)
      .each(attendee => attendee.message(msg));
  }
}

util.inherits(Game, EventEmitter);

module.exports = Game;
