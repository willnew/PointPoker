'use strict';

var shortid = require('shortid');

module.exports = class Game {
  constructor() {
    this.id = shortid.generate();
    this.attendees = [];
  }
};
