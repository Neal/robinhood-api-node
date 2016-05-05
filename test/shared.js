'use strict';

const nock = require('nock');

const testUsername = 'testUsername';
const testPassword = 'testPassword';
const testAuthToken = 'testAuthToken';
const testAccountNumber = 'testAccountNumber';
const testApiRoot = 'http://api.robin.hood';

process.env.ROBINHOOD_USERNAME = testUsername;
process.env.ROBINHOOD_PASSWORD = testPassword;
process.env.ROBINHOOD_AUTH_TOKEN = testAuthToken;
process.env.ROBINHOOD_ACCOUNT_NUMBER = testAccountNumber;
process.env.ROBINHOOD_API_ROOT = testApiRoot;

const resetNock = () => {
  nock.cleanAll();
  nock.disableNetConnect();

  nock(testApiRoot)
    .persist()
    .post('/api-token-auth/', {
      username: testUsername,
      password: testPassword
    })
    .reply(200, {
      token: testAuthToken
    });

  nock(testApiRoot)
    .persist()
    .get('/accounts/')
    .reply(200, {
      results: [{account_number: testAccountNumber}] // eslint-disable-line camelcase
    });
};

const commonInit = () => {
  before(resetNock);
  beforeEach(resetNock);
};

module.exports.testUsername = testUsername;
module.exports.testPassword = testPassword;
module.exports.testAuthToken = testAuthToken;
module.exports.testAccountNumber = testAccountNumber;
module.exports.testApiRoot = testApiRoot;
module.exports.resetNock = resetNock;
module.exports.commonInit = commonInit;
