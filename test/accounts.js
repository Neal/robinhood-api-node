'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');
const assert = chai.assert;

const shared = require('./shared');

const Robinhood = require('..');

describe('Accounts', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get all accounts', done => {
    rh.accounts.getAll()
      .then(data => {
        should.exist(data.body.results);
      })
      .catch(err => {
        should.not.exist(err);
      })
      .then(done);
  });

  it('should get primary account', done => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/accounts/' + shared.testAccountNumber + '/')
      .reply(200, {
        account_number: shared.testAccountNumber // eslint-disable-line camelcase
      });

    rh.accounts.get()
      .then(data => {
        should.exist(data.body.account_number);
      })
      .catch(err => {
        should.not.exist(err);
      })
      .then(done);
  });

  it('should get check day trade', done => {
    let instrument = 'https://api.robinhood.com/instruments/19b3c90a-c1ed-4a09-b411-30870fb1f719/';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/accounts/' + shared.testAccountNumber + '/day_trade_checks/')
      .query({instrument: instrument})
      .reply(200, {
        sell: {blocked: true}
      });

    rh.accounts.checkDayTrade(instrument)
      .then(data => {
        should.exist(data.body.sell);
        data.body.sell.blocked.should.equal(true);
      })
      .catch(err => {
        should.not.exist(err);
      })
      .then(done);
  });

  it('should get recent day trades', done => {
    let instrument = 'https://api.robinhood.com/instruments/19b3c90a-c1ed-4a09-b411-30870fb1f719/';
    let result = {date: '2016-01-01', instrument: instrument};

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/accounts/' + shared.testAccountNumber + '/recent_day_trades/')
      .reply(200, {
        results: [result]
      });

    rh.accounts.recentDayTrades()
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

  it('should get dividends', done => {
    let result = {
      account: 'https://api.robinhood.com/accounts/' + shared.testAccountNumber + '/',
      amount: '1.00',
      id: '9da749d2-0226-48a7-aba7-c289f831638d',
      instrument: 'https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/',
      paid_at: '2016-01-04T23:12:53.112483Z',
      payable_date: '2016-01-04',
      position: '2.0000',
      rate: '0.5200000000',
      record_date: '2016-01-01',
      url: 'https://api.robinhood.com/dividends/9da749d2-0226-48a7-aba7-c289f831638d/',
      withholding: '0.00'
    };

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/dividends/')
      .reply(200, {
        results: [result]
      });

    rh.accounts.dividends()
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

  it('should get portfolios', done => {
    let result = {
      account: 'https://api.robinhood.com/accounts/' + shared.testAccountNumber + '/',
      adjusted_equity_previous_close: '1000.0000',
      equity: '1010.0000',
      equity_previous_close: '1000.0000',
      excess_margin: '1000.0000',
      extended_hours_equity: null,
      extended_hours_market_value: null,
      last_core_equity: '1000.0000',
      last_core_market_value: '2000.0000',
      market_value: '2000.0000',
      url: 'https://api.robinhood.com/portfolios/' + shared.testAccountNumber + '/'
    };

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/portfolios/' + shared.testAccountNumber + '/')
      .reply(200, result);

    rh.accounts.portfolios()
      .then(data => {
        should.exist(data.body);
        should.exist(data.body.account);
        data.body.should.containEql(result);
      })
      .catch(err => {
        should.not.exist(err);
      })
      .then(done);
  });

  it('should get positions', done => {
    let result = {
      account: 'https://api.robinhood.com/accounts/' + shared.testAccountNumber + '/',
      average_buy_price: '107.3100',
      created_at: '2016-01-01T18:24:14.383015Z',
      instrument: 'https://api.robinhood.com/instruments/21392561-a786-46af-92ce-d6d73a7d289e/',
      intraday_quantity: '0.0000',
      quantity: '4.0000',
      shares_held_for_buys: '0.0000',
      shares_held_for_sells: '0.0000',
      updated_at: '2016-01-28T19:41:22.260517Z',
      url: 'https://api.robinhood.com/positions/' + shared.testAccountNumber + '/21392561-a786-46af-92ce-d6d73a7d289e/'
    };

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/positions/')
      .reply(200, {
        results: [result]
      });

    rh.accounts.positions()
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

  it('should get position', done => {
    let result = {
      account: 'https://api.robinhood.com/accounts/' + shared.testAccountNumber + '/',
      average_buy_price: '107.3100',
      created_at: '2016-01-01T18:24:14.383015Z',
      instrument: 'https://api.robinhood.com/instruments/21392561-a786-46af-92ce-d6d73a7d289e/',
      intraday_quantity: '0.0000',
      quantity: '4.0000',
      shares_held_for_buys: '0.0000',
      shares_held_for_sells: '0.0000',
      updated_at: '2016-01-28T19:41:22.260517Z',
      url: 'https://api.robinhood.com/positions/' + shared.testAccountNumber + '/21392561-a786-46af-92ce-d6d73a7d289e/'
    };

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/positions/' + shared.testAccountNumber + '/21392561-a786-46af-92ce-d6d73a7d289e/')
      .reply(200, result);

    rh.accounts.position('21392561-a786-46af-92ce-d6d73a7d289e')
      .then(data => {
        should.exist(data.body);
        should.exist(data.body.account);
        data.body.should.containEql(result);
      })
      .catch(err => {
        should.not.exist(err);
      })
      .then(done);
  });

});
