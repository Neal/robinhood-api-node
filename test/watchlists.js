'use strict';

const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Watchlists', () => {

  let rh;

  shared.commonInit();

  before(done => {
    rh = new Robinhood(null, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get watchlists', () => {
    nock(rh._apiRoot)
      .get('/watchlists/')
      .reply(200);

    return rh.watchlists.get().should.be.fulfilled();
  });

});
