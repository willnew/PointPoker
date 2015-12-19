'use strict';

const chai = require('chai');
const Player = require('../../main/domain/Player');
const sinon = require('sinon');

chai.should();

describe('{Player}', () => {
  describe('#constructor', () => {
    it('should be able to emit event', () => {
      var player = new Player({ name: 'crusoe' });
      var callback = sinon.spy();
      player.on('change', callback);
      player.emit('change');
      callback.called.should.be.true;
    });
  });
});
