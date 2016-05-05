'use strict';

const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Markets', () => {

  let rh;

  shared.commonInit();

  before(done => {
    rh = new Robinhood(null, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get markets', () => {
    nock(rh._apiRoot)
      .get('/markets/')
      .reply(200);

    return rh.markets.get().should.be.fulfilled();
  });

});
