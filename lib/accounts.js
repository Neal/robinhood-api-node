'use strict';

let Accounts = module.exports = function(rh) {
  this._rh = rh;
};

Accounts.prototype.getAll = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/accounts/'
  };

  return this._rh._makeRequest(opts, callback);
};

Accounts.prototype.get = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/accounts/' + this._rh._accountNumber + '/'
  };

  return this._rh._makeRequest(opts, callback);
};

Accounts.prototype.checkDayTrade = function(instrument, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/accounts/' + this._rh._accountNumber + '/day_trade_checks/',
    qs: {
      instrument: instrument
    }
  };

  return this._rh._makeRequest(opts, callback);
};

Accounts.prototype.recentDayTrades = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/accounts/' + this._rh._accountNumber + '/recent_day_trades/'
  };

  return this._rh._makeRequest(opts, callback);
};

Accounts.prototype.dividends = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/dividends/'
  };

  return this._rh._makeRequest(opts, callback);
};

Accounts.prototype.portfolios = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/portfolios/' + this._rh._accountNumber + '/'
  };

  return this._rh._makeRequest(opts, callback);
};

Accounts.prototype.positions = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/positions/'
  };

  return this._rh._makeRequest(opts, callback);
};

Accounts.prototype.position = function(instrumentId, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/positions/' + this._rh._accountNumber + '/' + instrumentId + '/'
  };

  return this._rh._makeRequest(opts, callback);
};
