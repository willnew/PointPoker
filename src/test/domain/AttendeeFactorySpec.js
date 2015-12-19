'use strict';

const chai = require('chai');
var AttendeeFactory = require('../../main/domain/AttendeeFactory');
var Player = require('../../main/domain/Attendee');
var Observer = require('../../main/domain/Observer');

chai.should();

describe('{AttendeeFactory}', () => {
  describe('#create', () => {
    it('should instantiate a {Player} if the role is equal \'PLAYER\'', () => {
      let user = {
        name: 'crusoe',
        role: 'PLAYER'
      };
      let attendee = AttendeeFactory.create(user);
      attendee.name.should.be.equal('crusoe');
      attendee.should.be.instanceof(Player);
    });

    it('should instantiate an {Observer} if the role is equal \'OBSERVER\'', () => {
      let attendee = AttendeeFactory.create({
        name: 'crusoe',
        role: 'OBSERVER'
      });
      attendee.name.should.be.equal('crusoe');
      attendee.should.be.instanceof(Observer);
    });
  });
});
