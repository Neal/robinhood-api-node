'use strict';

let Midlands = module.exports = function(rh) {
  this._rh = rh;
};

Midlands.prototype.getInstantPermissions = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/midlands/permissions/instant/'
  };

  return this._rh._makeRequest(opts, callback);
};

Midlands.prototype.topMovers = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/midlands/movers/sp500/',
    qs: {
      direction: 'down'
    }
  };

  return this._rh._makeRequest(opts, callback);
};

Midlands.prototype.news = function(symbol, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/midlands/news/' + symbol + '/'
  };

  return this._rh._makeRequest(opts, callback);
};

Midlands.prototype.getNotificationsStack = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/midlands/notifications/stack/'
  };

  return this._rh._makeRequest(opts, callback);
};

Midlands.prototype.dismissNotification = function(id, callback) {
  let opts = {
    method: 'POST',
    endpoint: '/midlands/notifications/stack/' + id + '/dismiss/'
  };

  return this._rh._makeRequest(opts, callback);
};

Midlands.prototype.getAchBanks = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/midlands/ach/banks/'
  };

  return this._rh._makeRequest(opts, callback);
};
