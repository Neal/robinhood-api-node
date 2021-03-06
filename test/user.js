'use strict';

const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('User', () => {

  let rh;

  shared.commonInit();

  before(done => {
    rh = new Robinhood(null, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get user', () => {
    nock(rh._apiRoot)
      .get('/user/')
      .reply(200);

    return rh.user.get().should.be.fulfilled();
  });

  it('should get user id', () => {
    nock(rh._apiRoot)
      .get('/user/id/')
      .reply(200);

    return rh.user.getId().should.be.fulfilled();
  });

  it('should get basic info', () => {
    nock(rh._apiRoot)
      .get('/user/basic_info/')
      .reply(200);

    return rh.user.getBasicInfo().should.be.fulfilled();
  });

  it('should get additional info', () => {
    nock(rh._apiRoot)
      .get('/user/additional_info/')
      .reply(200);

    return rh.user.getAdditionalInfo().should.be.fulfilled();
  });

  it('should get employment', () => {
    nock(rh._apiRoot)
      .get('/user/employment/')
      .reply(200);

    return rh.user.getEmployment().should.be.fulfilled();
  });

  it('should get investment profile', () => {
    nock(rh._apiRoot)
      .get('/user/investment_profile/')
      .reply(200);

    return rh.user.getInvestmentProfile().should.be.fulfilled();
  });

  it('should get identity mismatch', () => {
    nock(rh._apiRoot)
      .get('/user/identity_mismatch/')
      .reply(200);

    return rh.user.getIdentityMismatch().should.be.fulfilled();
  });

  it('should get cip questions', () => {
    nock(rh._apiRoot)
      .get('/user/cip_questions/')
      .reply(200);

    return rh.user.getCipQuestions().should.be.fulfilled();
  });

});
