'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Watchlists', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get watchlists', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/watchlists/')
      .reply(200);

    return rh.watchlists.get().should.be.fulfilled();
  });

});
