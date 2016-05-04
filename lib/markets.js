'use strict';

let Markets = module.exports = function(rh) {
  this._rh = rh;
};

Markets.prototype.get = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/markets/'
  };

  return this._rh._makeRequest(opts, callback);
};
