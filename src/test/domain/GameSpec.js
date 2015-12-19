'use strict';

const chai = require('chai');
const Game = require('../../main/domain/Game');
const Player = require('../../main/domain/Player');
const sinon = require('sinon');

chai.should();

describe('{Game}', () => {
  describe('#constructe', () => {
    it('should have an id', () => {
      var game = new Game();
      game.id.should.match(/.{8}/);
    });

    it('should subscribe \'add\' event');
  });

  describe('#add', () => {
    var game, player;
    beforeEach(() => {
      game = new Game();
      player = new Player({ name: 'crusoe' }); 
    });

    it('should add the attendee to the attendee list', () => {
      game.add(player);
      game.attendees.should.not.be.empty;
      game.attendees[0].name.should.be.equal('crusoe');
    });

    it('should subscribe the \'change\' event on the attendee', () => {
      sinon.spy(game, 'onAttendeeChanged');
      game.add(player);
      player.emit('change');
      game.onAttendeeChanged.calledOnce.should.be.true;
    });

    it('should emit \'add\' event');
  });

  describe('#removeAttendee', () => {
    it('should remove the attendee from the attendee list');

    it('should cancel subscribe event on the attendee');
  });
});
