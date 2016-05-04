'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');
const assert = chai.assert;

const Robinhood = require('..');

const fakeDataWithAuthToken = {
  authToken: 'someAuthToken'
};

describe('Accounts', () => {

  beforeEach(done => {
    nock.cleanAll();
    done();
  });

  afterEach(done => {
    done();
  });

  it('should get all accounts', done => {
    nock('https://api.robinhood.com', {reqheaders: {Authorization: 'Token someAuthToken'}})
      .persist()
      .get('/accounts/')
      .reply(200, {
        results: [{account_number: 'someAccountNumber'}] // eslint-disable-line camelcase
      });

    let rh = new Robinhood(fakeDataWithAuthToken, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);

      rh.accounts.getAll()
        .then(data => {
          should.exist(data.body.results);
        })
        .catch(err => {
          should.not.exist(err);
        })
        .then(done);
    });
  });

});
