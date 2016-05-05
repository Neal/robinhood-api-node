'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Password', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken, username: shared.testUsername}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should post password reset request', () => {
    const email = 'name@example.com';

    nock(rh._apiRoot, shared.reqHeaders)
      .post('/password_reset/request/', {email: email})
      .reply(200);

    return rh.password.requestReset(email).should.be.fulfilled();
  });

  it('should post password reset', () => {
    const token = '123456';

    nock(rh._apiRoot, shared.reqHeaders)
      .post('/password_reset/', {
        username: shared.testUsername,
        password: shared.testPassword,
        token: token
      })
      .reply(200);

    return rh.password.reset(token, shared.testPassword).should.be.fulfilled();
  });

});
