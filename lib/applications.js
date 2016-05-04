'use strict';

let Applications = module.exports = function(rh) {
  this._rh = rh;
};

Applications.prototype.get = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/applications/'
  };

  return this._rh._makeRequest(opts, callback);
};
