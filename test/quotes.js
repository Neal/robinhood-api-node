'use strict';

const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Quotes', () => {

  let rh;

  shared.commonInit();

  before(done => {
    rh = new Robinhood(null, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get quotes', () => {
    const symbol = 'AAPL';

    nock(rh._apiRoot)
      .get('/quotes/' + symbol + '/')
      .reply(200);

    return rh.quotes.get(symbol).should.be.fulfilled();
  });

});
