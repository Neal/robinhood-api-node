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

  it('should get all markets', () => {
    nock(rh._apiRoot)
      .get('/markets/')
      .reply(200);

    return rh.markets.getAll().should.be.fulfilled();
  });

  it('should get market', () => {
    const mic = 'XNAS';

    nock(rh._apiRoot)
      .get('/markets/' + mic + '/')
      .reply(200);

    return rh.markets.get(mic).should.be.fulfilled();
  });

  it('should get hours', () => {
    const mic = 'XNAS';
    const date = '2016-01-01';

    nock(rh._apiRoot)
      .get('/markets/' + mic + '/' + date + '/')
      .reply(200);

    return rh.markets.getHours(mic, date).should.be.fulfilled();
  });

});
