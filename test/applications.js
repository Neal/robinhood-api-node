'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Applications', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get applications', done => {
    let result = {
      cip_questions: null,
      customer_type: 'individual',
      last_error: '',
      ready: true,
      state: 'approved',
      url: 'https://api.robinhood.com/applications/individual/',
      user: 'https://api.robinhood.com/user/'
    };

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/applications/')
      .reply(200, {
        results: [result]
      });

    rh.applications.get()
      .then(data => {
        should.exist(data.body.results);
        data.body.results.length.should.equal(1);
        data.body.results.should.containEql(result);
      })
      .catch(err => {
        should.not.exist(err);
      })
      .then(done);
  });

});
