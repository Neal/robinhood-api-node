'use strict';

let Notifications = module.exports = function(rh) {
  this._rh = rh;
};

Notifications.prototype.get = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/notifications/'
  };

  return this._rh._makeRequest(opts, callback);
};

Notifications.prototype.getSettings = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/settings/notifications/'
  };

  return this._rh._makeRequest(opts, callback);
};

Notifications.prototype.getDevices = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/notifications/devices/'
  };

  return this._rh._makeRequest(opts, callback);
};
