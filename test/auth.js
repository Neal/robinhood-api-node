'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');
const assert = chai.assert;

const shared = require('./shared');

const Robinhood = require('..');

describe('Auth', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  describe('login', () => {

    const notString = 1234;

    beforeEach(done => {
      delete rh._authToken;
      done();
    })

    it('should get authToken from username and password', done => {
      nock('https://api.robinhood.com')
        .post('/api-token-auth/', {
          username: shared.testUsername,
          password: shared.testPassword
        })
        .reply(200, {
          token: 'someAuthToken'
        });

      should.not.exist(rh._authToken);

      rh.auth.login(shared.testUsername, shared.testPassword)
        .then(data => {
          should.exist(rh._authToken);
        })
        .catch(err => {
          should.not.exist(err);
        })
        .then(done);
    });

    it('should throw if username is not a string', () => {
      return rh.auth.login(notString, shared.testPassword).should.be.rejected();
    });

    it('should throw if password is not a string', () => {
      return rh.auth.login(shared.testUsername, notString).should.be.rejected();
    });

    it('should handle promise reject', () => {
      nock.cleanAll();

      nock(rh._apiRoot)
        .post('/api-token-auth/', {
          username: shared.testUsername,
          password: shared.testPassword
        })
        .reply(500);

      return rh.auth.login(shared.testUsername, shared.testPassword).should.be.rejected();
    });

  });

  describe('logout', () => {

    it('should clear authToken on logout', done => {
      nock(rh._apiRoot, shared.reqHeaders)
        .post('/api-token-logout/')
        .reply(200);

      rh.auth.logout()
        .then(data => {
          should.not.exist(rh._authToken);
        })
        .catch(err => {
          should.not.exist(err);
        })
        .then(done);
    });

    it('should handle promise reject', () => {
      nock(rh._apiRoot, shared.reqHeaders)
        .post('/api-token-logout/')
        .reply(500);

      return rh.auth.logout().should.be.rejected();
    });

  });

});
