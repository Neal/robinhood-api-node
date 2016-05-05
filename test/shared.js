'use strict';

const nock = require('nock');
const should = require('should');

const Robinhood = require('..');

const testUsername = 'testUsername';
const testPassword = 'testPassword';
const testAuthToken = 'testAuthToken';
const testAccountNumber = 'testAccountNumber';
const nockReqHeaders = {reqheaders: {Authorization: 'Token ' + testAuthToken}};

const commonInit = () => {

  beforeEach(done => {
    nock.cleanAll();
    nock.disableNetConnect();

    nock('https://api.robinhood.com')
      .persist()
      .post('/api-token-auth/', {
        username: testUsername,
        password: testPassword
      })
      .reply(200, {
        token: testAuthToken
      });

    nock('https://api.robinhood.com', {reqheaders: {Authorization: 'Token ' + testAuthToken}})
      .persist()
      .get('/accounts/')
      .reply(200, {
        results: [{account_number: testAccountNumber}] // eslint-disable-line camelcase
      });

    done();
  });

};

module.exports.testUsername = testUsername;
module.exports.testPassword = testPassword;
module.exports.testAuthToken = testAuthToken;
module.exports.testAccountNumber = testAccountNumber;
module.exports.nockReqHeaders = nockReqHeaders;
module.exports.commonInit = commonInit;
