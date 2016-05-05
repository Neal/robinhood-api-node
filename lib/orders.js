'use strict';

let Orders = module.exports = function(rh) {
  this._rh = rh;
};

Orders.prototype.getAll = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/orders/'
  };

  return this._rh._makeRequest(opts, callback);
};

Orders.prototype.get = function(instrumentId, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/orders/',
    qs: {
      instrument: instrumentId
    }
  };

  return this._rh._makeRequest(opts, callback);
};

Orders.prototype.place = function(opts, callback) {
  let reqOpts = {
    method: 'POST',
    endpoint: '/orders/',
    form: {
      account: this._rh._accountNumber,
      instrument: opts.instrument.url,
      symbol: opts.instrument.symbol.toUpperCase(),
      type: opts.type || 'market',
      time_in_force: opts.time || 'gfd', // eslint-disable-line camelcase
      trigger: opts.trigger || 'immediate',
      price: opts.price,
      stop_price: opts.stopPrice, // eslint-disable-line camelcase
      quantity: opts.quantity,
      side: opts.side
    }
  };

  return this._rh._makeRequest(reqOpts, callback);
};

Orders.prototype.buy = function(opts, callback) {
  opts.side = 'buy';
  return this.place(opts, callback);
};

Orders.prototype.sell = function(opts, callback) {
  opts.side = 'sell';
  return this.place(opts, callback);
};
