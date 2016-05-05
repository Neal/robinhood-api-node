'use strict';

const _ = require('lodash');
const request = require('request');
const Promise = require('bluebird');

const API_ROOT = 'https://api.robinhood.com';

const resources = {
  Accounts: require('./accounts'),
  Ach: require('./ach'),
  Applications: require('./applications'),
  Auth: require('./auth'),
  Documents: require('./documents'),
  Instruments: require('./instruments'),
  Margin: require('./margin'),
  Markets: require('./markets'),
  Midlands: require('./midlands'),
  Notifications: require('./notifications'),
  Orders: require('./orders'),
  Password: require('./password'),
  Quotes: require('./quotes'),
  User: require('./user'),
  Watchlists: require('./watchlists'),
  Wire: require('./wire'),
};

let Robinhood = module.exports = function(opts, callback) {
  opts = opts || {};

  this._username = opts.username || process.env.ROBINHOOD_USERNAME;
  this._password = opts.password || process.env.ROBINHOOD_PASSWORD;

  this._authToken = opts.authToken || process.env.ROBINHOOD_AUTH_TOKEN;

  this._accountNumber = opts.accountNumber || process.env.ROBINHOOD_ACCOUNT_NUMBER;

  this._apiRoot = opts.apiRoot || process.env.ROBINHOOD_API_ROOT || API_ROOT;

  this._init(callback);
};

Robinhood.prototype._init = function(callback) {
  let promise = new Promise((resolve, reject) => {
    this._request = request.defaults({
      json: true,
      gzip: true
    });

    this._initResources(resources);

    this.auth.login(this._username, this._password)
      .then(() => {
        this._getAccountNumber()
          .then(() => {
            resolve(this);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });

  return this._handleCallback(callback, promise);
};

Robinhood.prototype._initResources = function(resources) {
  for (let name in resources) {
    this[name.toLowerCase()] = new resources[name](this);
  }
};

Robinhood.prototype._getAccountNumber = function(callback) {
  let promise = new Promise((resolve, reject) => {
    if (this._accountNumber) {
      return resolve();
    }

    this.accounts.getAll()
      .then(data => {
        this._accountNumber = _.head(data.body.results).account_number;
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });

  return this._handleCallback(callback, promise);
};

Robinhood.prototype._makeRequest = function(opts, callback) {
  let promise = new Promise((resolve, reject) => {
    this._buildReqOpts(opts, (err, reqOpts) => {
      if (err) {
        return reject(err);
      }

      this._request(reqOpts, (err, res, body) => {
        if (err) {
          reject(err);
        } else if (res.statusCode >= 300) {
          reject(new Error('Unknown error occurred. HTTP status: ' + res.statusCode));
        } else {
          resolve({
            body: body,
            headers: res.headers,
            statusCode: res.statusCode
          });
        }
      });
    });
  });

  return this._handleCallback(callback, promise);
};

Robinhood.prototype._buildReqOpts = function(opts, callback) {
  if (!_.has(opts, 'method')) {
    return callback(new Error('Method is required to make this request.'));
  }

  if (!_.has(opts, 'endpoint')) {
    return callback(new Error('Endpoint is required to make this request.'));
  }

  let reqOpts = {};

  reqOpts.method = opts.method.toUpperCase();
  reqOpts.url = this._apiRoot + opts.endpoint;
  reqOpts.headers = opts.headers || {};
  reqOpts.qs = opts.qs;

  if (!opts.noAuthToken) {
    if (!this._authToken) {
      return callback(new Error('Auth token is required to make this request.'));
    }

    reqOpts.headers.Authorization = 'Token ' + this._authToken;
  }

  switch (reqOpts.method) {
    case 'POST':
      reqOpts.form = opts.form;
      break;
    default:
      break;
  }

  callback(null, reqOpts);
};

Robinhood.prototype._handleCallback = function(callback, promise) {
  if (callback && typeof callback === 'function') {
    promise.then(data => {
      callback(null, data);
    }, err => {
      callback(err);
    });
  }
  return promise;
};
