'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Margin', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get upgrades', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/margin/upgrades/')
      .reply(200);

    return rh.margin.getUpgrades().should.be.fulfilled();
  });

  it('should post upgrades', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .post('/margin/upgrades/')
      .reply(200);

    return rh.margin.postUpgrades().should.be.fulfilled();
  });

  it('should get settings', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/settings/margin/' + rh._accountNumber + '/')
      .reply(200);

    return rh.margin.getSettings().should.be.fulfilled();
  });

});
