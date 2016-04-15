'use strict';

var request = require('request-ssl');
request.addFingerprint('api.robinhood.com', '2C:B2:30:3F:E0:6B:92:DD:19:9F:D1:51:48:0C:20:C9:A0:3A:6A:A9');

var API_ROOT = 'https://api.robinhood.com';

var Robinhood = module.exports = function(opts, callback) {
  opts = opts || {};

  this._username = opts.username || process.env.ROBINHOOD_USERNAME;
  this._password = opts.password || process.env.ROBINHOOD_PASSWORD;

  this._authToken = opts.authToken || process.env.ROBINHOOD_AUTH_TOKEN;

  this._apiRoot = opts.apiRoot || process.env.ROBINHOOD_API_ROOT || API_ROOT;

  this.init(callback);
};

Robinhood.prototype.init = function(callback) {
  this._request = request.defaults({
    json: true,
    gzip: true
  });

  if (!this._authToken) {
    return this.login(callback);
  }

  var err = null;

  if (typeof this._authToken !== 'string') {
    err = new Error('Expected auth token to be a string.');
  }

  return process.nextTick(function() {
    callback(err);
  });
};

Robinhood.prototype.login = function(callback) {
  if (typeof this._username !== 'string') {
    return process.nextTick(function() {
      callback(new Error('Expected username to be a string.'));
    });
  }

  if (typeof this._password !== 'string') {
    return process.nextTick(function() {
      callback(new Error('Expected password to be a string.'));
    });
  }

  var opts = {
    method: 'POST',
    endpoint: '/api-token-auth/',
    form: {
      username: this._username,
      password: this._password
    },
    noAuthToken: true
  };

  var that = this;

  this._makeRequest(opts, function(err, data) {
    if (err) {
      return callback(err);
    }

    that._authToken = data.token;

    callback();
  });
};

Robinhood.prototype._makeRequest = function(opts, callback) {
  if (typeof callback !== 'function') {
    throw new Error('Callback not set but is required.');
  }

  var reqOpts = {};

  reqOpts.method = opts.method.toUpperCase();
  reqOpts.url = this._apiRoot + opts.endpoint;
  reqOpts.headers = opts.headers || {};

  if (!opts.noAuthToken) {
    if (!this._authToken) {
      return callback(new Error('Auth token is required to make this request.'));
    }

    reqOpts.headers['Authorization'] = 'Token ' + this._authToken;
  }

  switch (reqOpts.method) {
    case 'POST':
      reqOpts.form = opts.form;
      break;
  }

  this._request(reqOpts, function(err, res, body) {
    if (err) {
      return callback(err, body, res);
    }

    if (res.statusCode < 300) {
      return callback(null, body, res);
    }

    callback(new Error('Unknown error. Status code: ' + res.statusCode), body, res);
  });
};
