'use strict';

let Quotes = module.exports = function(rh) {
  this._rh = rh;
};

Quotes.prototype.get = function(symbol, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/quotes/' + symbol.toUpperCase() + '/'
  };

  return this._rh._makeRequest(opts, callback);
};
