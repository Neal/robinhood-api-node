'use strict';

const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Auth', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood(null, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  describe('login', () => {

    const notString = 1234;

    beforeEach(() => {
      delete rh._authToken;
    });

    it('should get authToken from username and password', () => {
      nock('https://api.robinhood.com')
        .post('/api-token-auth/', {
          username: shared.testUsername,
          password: shared.testPassword
        })
        .reply(200, {
          token: 'someAuthToken'
        });

      should.not.exist(rh._authToken);

      return rh.auth.login(shared.testUsername, shared.testPassword).then(() => {
        should.exist(rh._authToken);
      });
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

    it('should clear authToken on logout', () => {
      nock(rh._apiRoot)
        .post('/api-token-logout/')
        .reply(200);

      return rh.auth.logout().then(() => {
        should.not.exist(rh._authToken);
      });
    });

    it('should handle promise reject', () => {
      nock(rh._apiRoot)
        .post('/api-token-logout/')
        .reply(500);

      return rh.auth.logout().should.be.rejected();
    });

  });

});
