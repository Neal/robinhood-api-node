'use strict';

let Instruments = module.exports = function(rh) {
  this._rh = rh;
};

Instruments.prototype.forSymbol = function(symbol, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/instruments/',
    qs: {
      query: symbol.toUpperCase()
    }
  };

  return this._rh._makeRequest(opts, callback);
};

Instruments.prototype.forId = function(id, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/instruments/' + id + '/'
  };

  return this._rh._makeRequest(opts, callback);
};
