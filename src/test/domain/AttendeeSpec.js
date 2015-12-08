'use strict';
var should = require('should');
var Attendee = require('../../main/domain/Attendee');

describe('{Attendee}', function() {
  describe('#constructor', function() {
    it('should be able to instantiate.', function() {
      var attendee = new Attendee({ name: 'crusoe' });
      attendee.should.not.be.null;
      attendee.should.be.an.instanceof(Attendee);
      attendee.name.should.be.equal('crusoe');
    });
  });
});
