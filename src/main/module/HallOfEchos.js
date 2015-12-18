'use strict';

/**
 * This is the Hall of echos, ear of the dragon, tongue of the lord...
 *
 * Protocal:
 *  transfer format: JSON
 *  @example {
 *   type: 'CREATE_GAME'
 *  }
 * */

var WebSocketServer = require('ws').Server;
var rx = require('rx');
var AttendeeFactory = require('../domain/AttendeeFactory');
var Game = require('../domain/Game');

module.exports = class HallOfEchos {
  /**
   * @param {Object} options
   * @param {Object} options.server
   * @param {Object} options.sessionHandler
   * */
  constructor(options) {
    this.wss = new WebSocketServer({ server: options.server });
    this.parseSession = rx.Observable.fromCallback(options.sessionHandler);
  }

  reverberate() {
    rx.Observable
      .fromEvent(this.wss, 'connection')
      .forEach(socket => this.parseSession(socket.upgradeReq, {})
          .subscribe(req => this.handleMessage(socket, req.session))
      );
    return this;
  }

  handleMessage(socket, session) {
    rx.Observable.fromEvent(socket, 'message')
      .map(event => JSON.parse(event.data))
      .forEach(payload => {
        switch(payload.type) {
          case 'CREATE_GAME':
            break;
          case 'JOIN_GAME':
            break;
          case 'VOTE':
            break;
          case 'FLIP':
            break;
        }
      });
  }

  /**
   * @param {Object} user
   * @param {String} user.name
   * @param {String} user.role
   * */
  static createGame(user) {
    let game = new Game();
    let attendee = AttendeeFactory.create(user);
  }
};
