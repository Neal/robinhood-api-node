'use strict';

let Markets = module.exports = function(rh) {
  this._rh = rh;
};

Markets.prototype.getAll = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/markets/'
  };

  return this._rh._makeRequest(opts, callback);
};

Markets.prototype.get = function(mic, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/markets/' + mic + '/'
  };

  return this._rh._makeRequest(opts, callback);
};

Markets.prototype.getHours = function(mic, date, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/markets/' + mic + '/' + date + '/'
  };

  return this._rh._makeRequest(opts, callback);
};
