'use strict';

const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Notifications', () => {

  let rh;

  shared.commonInit();

  before(done => {
    rh = new Robinhood(null, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get notifications', () => {
    nock(rh._apiRoot)
      .get('/notifications/')
      .reply(200);

    return rh.notifications.get().should.be.fulfilled();
  });

  it('should get settings', () => {
    nock(rh._apiRoot)
      .get('/settings/notifications/')
      .reply(200);

    return rh.notifications.getSettings().should.be.fulfilled();
  });

  it('should get devices', () => {
    nock(rh._apiRoot)
      .get('/notifications/devices/')
      .reply(200);

    return rh.notifications.getDevices().should.be.fulfilled();
  });

});
