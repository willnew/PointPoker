'use strict';

/* globals require */
/* globals module */

var Player = require('./Player');
var Observer = require('./Observer');

module.exports = {
  create: function(user) {
    switch (user.role) {
      case 'PLAYER':
        return new Player(user);
      case 'OBSERVER':
        return new Observer(user);
    }
    throw new TypeError(`Invalid role type: ${user.role}`);
  }
};
