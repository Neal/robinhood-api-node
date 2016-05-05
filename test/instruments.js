'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Instruments', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get instruments for symbol', () => {
    const symbol = 'AAPL';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/instruments/')
      .query({query: symbol})
      .reply(200);

    return rh.instruments.forSymbol(symbol).should.be.fulfilled();
  });

  it('should get instruments by id', () => {
    const id = 'c9bf8b91-32e0-460c-8909-f809790a2e06';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/instruments/' + id + '/')
      .reply(200);

    return rh.instruments.forId(id).should.be.fulfilled();
  });

});
