'use strict';
const chai = require('chai');
var Attendee = require('../../main/domain/Attendee');
var sinon = require('sinon');

chai.should();

describe('{Attendee}', function() {
  describe('#constructor', function() {
    it('should be able to instantiate.', function() {
      var attendee = new Attendee({ name: 'crusoe' });
      attendee.should.not.be.null;
      attendee.should.be.an.instanceof(Attendee);
      attendee.name.should.be.equal('crusoe');
    });

    it('should be able to emit event', () => {
      var attendee = new Attendee({ name: 'crusoe' });
      var callback = sinon.spy();
      attendee.on('change', callback);
      attendee.emit('change');
      callback.calledOnce.should.be.true;
    });
  });

  describe('#toJSON', () => {
    it('should create an plain object with specific properties');
  });
});
