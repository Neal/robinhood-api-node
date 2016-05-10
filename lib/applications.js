'use strict';

let Applications = module.exports = function(rh) {
  this._rh = rh;
};

Applications.prototype.getAll = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/applications/'
  };

  return this._rh._makeRequest(opts, callback);
};

Applications.prototype.get = function(type, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/applications/' + type + '/'
  };

  return this._rh._makeRequest(opts, callback);
};
