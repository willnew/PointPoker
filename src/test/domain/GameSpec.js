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
      sinon.spy(game, 'broadcastAttendeeChanged');
      game.add(player);
      player.emit('change');
      game.broadcastAttendeeChanged.calledOnce.should.be.true;
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

    it('should remove the attendeee if pass in the attendee\'s id', () => {
      game.remove(player1.id);
      game.attendees.length.should.be.equal(1);
      game.attendees.indexOf(player1).should.be.equal(-1);
    });

    it('should cancel subscribe event on the attendee', () => {
      player1.removeAllListeners = sinon.spy(player1.removeAllListeners);
      game.remove(player1);
      player1.removeAllListeners.calledOnce.should.be.true;
      player1.removeAllListeners.calledWith('change').should.be.true;
    });

    it('should be destroyed if all of the attendee have been removed');
  });

  describe('#find', () => {
    var game, player1, player2;

    beforeEach(() => {
      game = new Game();
      player1 = new Player({ name: 'c' });
      player2 = new Player({ name: 'v' });
      game.add(player1);
      game.add(player2);
    });

    it('should find the attendee by giving attendee\'s id', () => {
      game.find(player1.id).should.be.equal(player1);
      game.find(player2.id).should.be.equal(player2);
    });
  });

  describe('#broadcastAttendeeChanged', () => {
    let game, p1, p2, p3;
    beforeEach(() => {
      game = new Game();
      p1 = new Player({name: 'c'});
      p2 = new Player({name: 'v'});
      p3 = new Player({name: 'g'});
      game.add(p1).add(p2).add(p3);
    });

    it('should message each attendee for the changes', () => {
      p1.message = sinon.spy(p1, 'message');
      p2.message = sinon.spy(p2, 'message');
      p3.message = sinon.spy(p3, 'message');

      let message = { id: p3.id };
      p3.emit('change', message);
      p1.message.calledWith(message).should.be.true;
      p2.message.calledWith(message).should.be.true;
      p3.message.calledWith(message).should.be.false;
    });
  });
});
