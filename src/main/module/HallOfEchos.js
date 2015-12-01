'use strict';

/**
 * This is the Hall of echos, ear of the dragon, tongue of the lord...
 * */

/* globals module */
/* globals require */

var WebSocketServer = require('ws').Server;

module.exports = class HallOfMessage {
  /**
   * @param {Object} options
   * @param {Object} options.server
   * @param {Object} options.sessionHandler
   * */
  constructor(options) {
    this.wss = new WebSocketServer({ server: options.server });
    this.sessionHandler = options.sessionHandler;
  }

  reverberate() {
    this.wss.on('connection', (function(socket) {
      this.sessionHandler(socket.upgradeReq, {}, function(req) {
        let session = req.session;
        // TODO: Generate attendee.
      });

      let attendee;
      socket.on('message', (function(event) {
        let payload = JSON.parse(event.data);
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
      }).bind(this));

    }).bind(this));
    return this;
  }
};
