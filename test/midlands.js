'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Midlands', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get instant permissions', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/midlands/permissions/instant/')
      .reply(200);

    return rh.midlands.getInstantPermissions().should.be.fulfilled();
  });

  it('should get top movers', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/midlands/movers/sp500/')
      .query({direction: 'down'})
      .reply(200);

    return rh.midlands.topMovers().should.be.fulfilled();
  });

  it('should get news', () => {
    const symbol = 'AAPL';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/midlands/news/' + symbol + '/')
      .reply(200);

    return rh.midlands.news(symbol).should.be.fulfilled();
  });

  it('should get notifications stack', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/midlands/notifications/stack/')
      .reply(200);

    return rh.midlands.getNotificationsStack().should.be.fulfilled();
  });

  it('should dismiss notification', () => {
    const id = 'e0acd41d-3b68-4b63-b39e-a83c9fc94041';

    nock(rh._apiRoot, shared.reqHeaders)
      .post('/midlands/notifications/stack/' + id + '/dismiss/')
      .reply(200);

    return rh.midlands.dismissNotification(id).should.be.fulfilled();
  });

  it('should get ach banks', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/midlands/ach/banks/')
      .reply(200);

    return rh.midlands.getAchBanks().should.be.fulfilled();
  });

});
