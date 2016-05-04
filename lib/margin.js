'use strict';

let Margin = module.exports = function(rh) {
  this._rh = rh;
};

Margin.prototype.getUpgrades = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/margin/upgrades/'
  };

  return this._rh._makeRequest(opts, callback);
};

Margin.prototype.postUpgrades = function(callback) {
  let opts = {
    method: 'POST',
    endpoint: '/margin/upgrades/'
  };

  return this._rh._makeRequest(opts, callback);
};

Margin.prototype.getSettings = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/settings/margin/' + this._rh._accountNumber + '/'
  };

  return this._rh._makeRequest(opts, callback);
};
