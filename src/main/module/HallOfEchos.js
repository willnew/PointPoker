'use strict';

/**
 * This is the Hall of echos, ear of the dragon, tongue of the lord...
 * */

/* globals module */
/* globals require */

var WebSocketServer = require('ws').Server;
var rx = require('rx');

module.exports = class HallOfEchos {
  /**
   * @param {Object} options
   * @param {Object} options.server
   * @param {Object} options.sessionHandler
   * */
  constructor(options) {
    this.wss = new WebSocketServer({ server: options.server });
    this.sessionHandler = rx.Observable.fromCallback(options.sessionHandler);
  }

  reverberate() {
    rx.Observable
      .fromEvent(this.wss, 'connection')
      .forEach(socket => 
        this.sessionHandler(socket.upgradeReq, {})
          .subscribe(req => this.contactWithClient(socket, req.session))
      );
    return this;
  }

  contactWithClient(socket, session) {
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
};
