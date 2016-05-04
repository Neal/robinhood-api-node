'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');
const assert = chai.assert;

const Robinhood = require('..');

const fakeData = {
  username: 'someUsername',
  password: 'somePassword',
  authToken: 'someAuthToken',
  accountNumber: 'someAccountNumber',
  apiRoot: 'https://api.robinhood.com'
};

const fakeDataWithUsernamePassword = {
  username: 'someUsername',
  password: 'somePassword'
};

const fakeDataWithAuthToken = {
  authToken: 'someAuthToken'
};

describe('Robinhood', () => {

  beforeEach(done => {
    nock.cleanAll();

    nock('https://api.robinhood.com')
      .post('/api-token-auth/', {
        username: 'someUsername',
        password: 'somePassword'
      })
      .reply(200, {
        token: 'someAuthToken'
      });

    nock('https://api.robinhood.com', {reqheaders: {Authorization: 'Token someAuthToken'}})
      .persist()
      .get('/accounts/')
      .reply(200, {
        results: [{account_number: 'someAccountNumber'}] // eslint-disable-line camelcase
      });

    done();
  });

  afterEach(done => {
    done();
  });

  it('should set username, password, authToken, accountNumber and apiRoot', () => {
    let rh = new Robinhood(fakeData);
    rh._username.should.equal(fakeData.username);
    rh._password.should.equal(fakeData.password);
    rh._authToken.should.equal(fakeData.authToken);
    rh._accountNumber.should.equal(fakeData.accountNumber);
    rh._apiRoot.should.equal(fakeData.apiRoot);
  });

  it('should handle callback', () => {
    let rh = new Robinhood(fakeData, (err, data) => {
      should.not.exist(err);
      should.exist(data);
    });
  });

  it('should handle promise', () => {
    let rh = new Robinhood(fakeData, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      rh.accounts.getAll()
        .then(data => {
          should.exist(data);
        })
        .catch(err => {
          should.not.exist(err);
        });
    });
  });

  it('should get accountNumber', done => {
    let rh = new Robinhood(fakeDataWithAuthToken, err => {
      should.not.exist(err);
      should.exist(rh._authToken);
      rh._getAccountNumber()
        .then(data => {
          should.exist(rh._accountNumber);
        })
        .catch(err => {
          should.not.exist(err);
        })
        .then(done);
    });
  });

});
