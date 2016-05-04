'use strict';

let Password = module.exports = function(rh) {
  this._rh = rh;
};

Password.prototype.requestReset = function(email, callback) {
  let opts = {
    method: 'POST',
    endpoint: '/password_reset/request/',
    form: {
      email: email
    },
    noAuthToken: true
  };

  return this._rh._makeRequest(opts, callback);
};

Password.prototype.reset = function(token, password, callback) {
  let opts = {
    method: 'POST',
    endpoint: '/password_reset/',
    form: {
      username: this._rh._username,
      password: password,
      token: token
    },
    noAuthToken: true
  };

  return this._rh._makeRequest(opts, callback);
};
