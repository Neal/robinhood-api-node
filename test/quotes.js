'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Quotes', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get quotes', () => {
    const symbol = 'AAPL';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/quotes/' + symbol + '/')
      .reply(200);

    return rh.quotes.get(symbol).should.be.fulfilled();
  });

});
