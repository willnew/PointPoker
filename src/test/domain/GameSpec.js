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

    it('should message each attendee in the list about the new participant', () => {
      var existingPlayer = new Player({ name: 'vickie' });
      var spyMessage = sinon.spy(existingPlayer, 'message');
      game.add(existingPlayer);
      spyMessage.calledOnce.should.be.false;
      game.add(player);
      spyMessage.calledOnce.should.be.true;
      spyMessage.getCall(0).args[0].should.be.equal('add');
      spyMessage.getCall(0).args[1].should.be.equal(player);
    });
  });

  describe('#remove', () => {
    var game, player1, player2;

    beforeEach(() => {
      game = new Game();
      player1 = new Player({ name: 'crusoe' });
      game.add(player1);
      player2 = new Player({ name: 'vickie' });
      game.add(player2);
    });

    it('should remove the attendee from the attendee list if pass in the attendee', () => {
      game.remove(player1);
      game.attendees.length.should.be.equal(1);
      game.attendees.indexOf(player1).should.be.equal(-1);
    });

    it('should remove the attendeee if pass in the attendee\'s id');

    it('should cancel subscribe event on the attendee');

    it('should be destroyed if all of the attendee have been removed');
  });
});
