'use strict';

let Documents = module.exports = function(rh) {
  this._rh = rh;
};

Documents.prototype.requests = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/upload/document_requests/'
  };

  return this._rh._makeRequest(opts, callback);
};

Documents.prototype.getAll = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/documents/'
  };

  return this._rh._makeRequest(opts, callback);
};

Documents.prototype.getInfo = function(id, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/documents/' + id + '/'
  };

  return this._rh._makeRequest(opts, callback);
};

Documents.prototype.getUrl = function(id, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/documents/' + id + '/download/'
  };

  return this._rh._makeRequest(opts, callback);
};
