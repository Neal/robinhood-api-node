'use strict';

const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Applications', () => {

  let rh;

  shared.commonInit();

  before(done => {
    rh = new Robinhood(null, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get all applications', () => {
    let result = {
      cip_questions: null,
      customer_type: 'individual',
      last_error: '',
      ready: true,
      state: 'approved',
      url: 'https://api.robinhood.com/applications/individual/',
      user: 'https://api.robinhood.com/user/'
    };

    nock(rh._apiRoot)
      .get('/applications/')
      .reply(200, {
        results: [result]
      });

    return rh.applications.getAll().then(data => {
      should.exist(data.body.results);
      data.body.results.length.should.equal(1);
      data.body.results.should.containEql(result);
    });
  });

  it('should get application', () => {
    const type = 'individual';

    let result = {
      cip_questions: null,
      customer_type: type,
      last_error: '',
      ready: true,
      state: 'approved',
      url: 'https://api.robinhood.com/applications/individual/',
      user: 'https://api.robinhood.com/user/'
    };

    nock(rh._apiRoot)
      .get('/applications/' + type + '/')
      .reply(200, result);

    return rh.applications.get(type).then(data => {
      should.exist(data.body.customer_type);
      data.body.customer_type.should.equal(type);
    });
  });

});
