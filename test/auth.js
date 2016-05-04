'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');
const assert = chai.assert;

const Robinhood = require('..');

const fakeDataWithUsernamePassword = {
  username: 'someUsername',
  password: 'somePassword'
};

describe('Auth', () => {

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

  it('should get authToken from username and password', done => {
    let rh = new Robinhood(fakeDataWithUsernamePassword, err => {
      should.not.exist(err);
      should.exist(rh._authToken);
      done();
    });
  });

  it('should throw if no authToken is present', done => {
    let rh = new Robinhood(fakeDataWithUsernamePassword, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);

      // delete account number and reset nock to fail
      delete rh._accountNumber;
      nock.cleanAll();
      nock('https://api.robinhood.com').get('/accounts/').reply(401);

      rh.accounts.get()
        .catch(err => {
          should.exist(err);
        })
        .then(done);
    });
  });

});
