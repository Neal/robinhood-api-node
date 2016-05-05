'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');
const assert = chai.assert;

const shared = require('./shared');

const Robinhood = require('..');

describe('Robinhood', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should set username, password, authToken, accountNumber and apiRoot', done => {
    const fakeData = {
      username: 'someUsername',
      password: 'somePassword',
      authToken: 'someAuthToken',
      accountNumber: 'someAccountNumber',
      apiRoot: 'https://api.robinhood.com'
    };

    let rh = new Robinhood(fakeData, err => {
      should.not.exist(err);
      rh._username.should.equal(fakeData.username);
      rh._password.should.equal(fakeData.password);
      rh._authToken.should.equal(fakeData.authToken);
      rh._accountNumber.should.equal(fakeData.accountNumber);
      rh._apiRoot.should.equal(fakeData.apiRoot);
      done();
    });
  });

  it('should get accountNumber', done => {
    rh._getAccountNumber()
      .then(data => {
        should.exist(rh._accountNumber);
      })
      .catch(err => {
        should.not.exist(err);
      })
      .then(done);
  });

  it('should handle empty opts', () => {
    new Robinhood(null, err => {
      should.exist(err);
    });
  });

  it('should handle success callback', done => {
    rh.accounts.getAll((err, data) => {
      should.not.exist(err);
      should.exist(data);
      done();
    });
  });

  it('should handle failure callback', done => {
    delete rh._authToken;
    rh.accounts.getAll((err, data) => {
      should.exist(err);
      done();
    });
  });

  it('should handle resolved promise', () => {
    return rh.accounts.getAll().should.be.fulfilled();
  });

  it('should handle rejected promise', () => {
    delete rh._authToken;
    return rh.accounts.getAll().should.be.rejected();
  });

  describe('init', () => {

    beforeEach(done => {
      nock.cleanAll();
      nock.disableNetConnect();

      delete rh._accountNumber;

      done();
    });

    it('should handle network error when getting account', () => {
      return rh._init().should.be.rejected();
    });

    it('should handle network error when logging in', () => {
      delete rh._authToken;

      return rh._init().should.be.rejected();
    });

  });

  describe('makeRequest', () => {

    it('should handle network error', () => {
      nock.cleanAll();
      nock.disableNetConnect();

      delete rh._accountNumber;

      return rh._getAccountNumber().should.be.rejected();
    });

  });

  describe('buildReqOpts', () => {

    it('should throw error with no method', done => {
      let opts = {
        endpoint: '/test/'
      };

      rh._buildReqOpts(opts, err => {
        should.exist(err);
        done();
      });
    });

    it('should throw error with no endpoint', done => {
      let opts = {
        method: 'GET'
      };

      rh._buildReqOpts(opts, err => {
        should.exist(err);
        done();
      });
    });

    it('should accept custom method', done => {
      let opts = {
        method: 'POST',
        endpoint: '/test/'
      };

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.not.exist(err);
        should.exist(reqOpts.method);
        reqOpts.method.should.equal(opts.method);
        done();
      });
    });

    it('should accept custom endpoint', done => {
      let opts = {
        method: 'GET',
        endpoint: '/test/'
      };

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.not.exist(err);
        should.exist(reqOpts.url);
        reqOpts.url.should.equal(rh._apiRoot + opts.endpoint);
        done();
      });
    });

    it('should accept custom headers', done => {
      let opts = {
        method: 'GET',
        endpoint: '/test/',
        headers: {
          'accept': 'application/json'
        }
      };

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.not.exist(err);
        should.exist(reqOpts.headers.accept);
        reqOpts.headers.accept.should.equal(opts.headers.accept);
        done();
      });
    });

    it('should accept custom query params', done => {
      let opts = {
        method: 'GET',
        endpoint: '/test/',
        qs: {
          'symbol': 'AAPL'
        }
      };

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.not.exist(err);
        should.exist(reqOpts.qs.symbol);
        reqOpts.qs.symbol.should.equal(opts.qs.symbol);
        done();
      });
    });

    it('should handle noAuthToken flag', done => {
      let opts = {
        method: 'GET',
        endpoint: '/test/',
        noAuthToken: true
      };

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.not.exist(err);
        should.not.exist(reqOpts.headers.Authorization);
        done();
      });
    });

    it('should set auth header', done => {
      let opts = {
        method: 'GET',
        endpoint: '/test/'
      };

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.not.exist(err);
        should.exist(reqOpts.headers.Authorization);
        reqOpts.headers.Authorization.should.equal('Token ' + rh._authToken);
        done();
      });
    });

    it('should throw if no auth token', done => {
      let opts = {
        method: 'GET',
        endpoint: '/test/'
      };

      delete rh._authToken;

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.exist(err);
        done();
      });
    });

    it('should handle POST form', done => {
      let opts = {
        method: 'POST',
        endpoint: '/test/',
        form: {
          'symbol': 'AAPL'
        }
      };

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.not.exist(err);
        should.exist(reqOpts.form.symbol);
        reqOpts.form.symbol.should.equal(opts.form.symbol);
        done();
      });
    });

    it('should discard form if not POST', done => {
      let opts = {
        method: 'GET',
        endpoint: '/test/',
        form: {
          'symbol': 'AAPL'
        }
      };

      rh._buildReqOpts(opts, (err, reqOpts) => {
        should.not.exist(err);
        should.not.exist(reqOpts.form);
        done();
      });
    });

  });

});
