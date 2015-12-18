'use strict';

var should = require('should');
var Game = require('../../main/domain/Game.js');

describe('{Game}', () => {
  describe('#constructe', () => {
    it('should have an id', () => {
      var game = new Game();
      game.id.should.match(/.{8}/);
    });
  });

  describe('#addAttendee', () => {
    it('should add the attendee to the attendee list');

    it('should subscribe the \'change\' event on the attendee');
  });

  describe('#removeAttendee', () => {
    it('should remove the attendee from the attendee list');

    it('should cancel subscribe event on the attendee');
  });
});
