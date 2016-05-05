'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Orders', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get all orders', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/orders/')
      .reply(200);

    return rh.orders.getAll().should.be.fulfilled();
  });

  it('should get orders for instrument', () => {
    const instrument = '3ff8e73d-053e-4082-8489-178b77bfcc46';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/orders/')
      .query({instrument: instrument})
      .reply(200);

    return rh.orders.get(instrument).should.be.fulfilled();
  });

  describe('place', () => {

    let opts;
    let form;

    beforeEach(() => {
      opts = {
        instrument: {
          url: 'anInstrumentUrl',
          symbol: 'AAPL'
        },
        price: '10.00',
        quantity: '2.00',
        side: 'buy'
      };
      form = {
        account: rh._accountNumber,
        instrument: opts.instrument.url,
        symbol: opts.instrument.symbol.toUpperCase(),
        type: opts.type || 'market',
        time_in_force: opts.time || 'gfd', // eslint-disable-line camelcase
        trigger: opts.trigger || 'immediate',
        price: opts.price,
        stop_price: opts.stopPrice, // eslint-disable-line camelcase
        quantity: opts.quantity,
        side: opts.side
      };
    });

    it('should place an order', () => {
      nock(rh._apiRoot, shared.reqHeaders)
        .post('/orders/', form)
        .reply(200);

      return rh.orders.place(opts).should.be.fulfilled();
    });

    it('should place a buy order', () => {
      form.side = 'buy';

      nock(rh._apiRoot, shared.reqHeaders)
        .post('/orders/', form)
        .reply(200);

      return rh.orders.buy(opts).should.be.fulfilled();
    });

    it('should place a sell order', () => {
      form.side = 'sell';

      nock(rh._apiRoot, shared.reqHeaders)
        .post('/orders/', form)
        .reply(200);

      return rh.orders.sell(opts).should.be.fulfilled();
    });

  });

});
