'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Ach', () => {

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
      .get('/ach/relationships/')
      .reply(200);

    return rh.ach.getRelationships().should.be.fulfilled();
  });

  it('should get relationship', () => {
    const id = 'd27445fb-bf6d-403a-be53-6d9101010083';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/ach/relationships/' + id + '/')
      .reply(200);

    return rh.ach.getRelationship(id).should.be.fulfilled();
  });

  it('should get transfers', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/ach/transfers/')
      .reply(200);

    return rh.ach.getTransfers().should.be.fulfilled();
  });

  it('should get transfer', () => {
    const id = 'd27445fb-bf6d-403a-be53-6d9101010083';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/ach/transfers/' + id + '/')
      .reply(200);

    return rh.ach.getTransfer(id).should.be.fulfilled();
  });

  it('should get deposit schedules', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/ach/deposit_schedules/')
      .reply(200);

    return rh.ach.getDepositSchedules().should.be.fulfilled();
  });

  it('should get deposit schedule', () => {
    const id = 'd27445fb-bf6d-403a-be53-6d9101010083';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/ach/deposit_schedules/' + id + '/')
      .reply(200);

    return rh.ach.getDepositSchedule(id).should.be.fulfilled();
  });

  it('should get queued deposit', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/ach/iav/queued_deposit/')
      .reply(200);

    return rh.ach.getQueuedDeposit().should.be.fulfilled();
  });

  it('should post verify micro deposit', () => {
    const id = 'd27445fb-bf6d-403a-be53-6d9101010083';
    const amountOne = '0.12';
    const amountTwo = '0.34';

    nock(rh._apiRoot, shared.reqHeaders)
      .post('/ach/relationships/' + id + '/micro_deposits/veryify/', {
        first_amount_cents: amountOne,
        second_amount_cents: amountTwo
      })
      .reply(200);

    return rh.ach.verifyMicroDeposits(id, amountOne, amountTwo).should.be.fulfilled();
  });

  it('should get bank', () => {
    const routingNumber = '12345';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/ach/banks/' + routingNumber + '/')
      .reply(200);

    return rh.ach.getBank(routingNumber).should.be.fulfilled();
  });

});
