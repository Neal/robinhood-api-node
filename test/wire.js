'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Wire', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get relationships', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/wire/relationships/')
      .reply(200);

    return rh.wire.getRelationships().should.be.fulfilled();
  });

  it('should get transfers', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/wire/transfers/')
      .reply(200);

    return rh.wire.getTransfers().should.be.fulfilled();
  });

});
