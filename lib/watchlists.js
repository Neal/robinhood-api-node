'use strict';

let Watchlists = module.exports = function(rh) {
  this._rh = rh;
};

Watchlists.prototype.get = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/watchlists/'
  };

  return this._rh._makeRequest(opts, callback);
};
