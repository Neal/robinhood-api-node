'use strict';

let Wire = module.exports = function(rh) {
  this._rh = rh;
};

Wire.prototype.getRelationships = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/wire/relationships/'
  };

  return this._rh._makeRequest(opts, callback);
};

Wire.prototype.getTransfers = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/wire/transfers/'
  };

  return this._rh._makeRequest(opts, callback);
};
