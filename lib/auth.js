'use strict';

let Auth = module.exports = function(rh) {
  this._rh = rh;
};

Auth.prototype.login = function(username, password, callback) {
  let promise = new Promise((resolve, reject) => {
    if (this._rh._authToken) {
      return resolve({message: 'Already have auth token.'});
    }

    if (typeof username !== 'string') {
      return reject(new Error('Expected username to be a string.'));
    }

    if (typeof password !== 'string') {
      return reject(new Error('Expected password to be a string.'));
    }

    let opts = {
      method: 'POST',
      endpoint: '/api-token-auth/',
      form: {
        username: username,
        password: password
      },
      noAuthToken: true
    };

    this._rh._makeRequest(opts)
      .then(data => {
        this._rh._authToken = data.body.token;
        resolve({message: 'Successfully got auth token.'});
      })
      .catch(err => {
        reject(err);
      });
  });

  return this._rh._handleCallback(callback, promise);
};

Auth.prototype.logout = function(callback) {
  let promise = new Promise((resolve, reject) => {
    let opts = {
      method: 'POST',
      endpoint: '/api-token-logout/'
    };

    this._rh._makeRequest(opts)
      .then(() => {
        delete this._rh._authToken;
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });

  return this._rh._handleCallback(callback, promise);
};
