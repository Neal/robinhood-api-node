'use strict';

let User = module.exports = function(rh) {
  this._rh = rh;
};

User.prototype.get = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/user/'
  };

  return this._rh._makeRequest(opts, callback);
};

User.prototype.getId = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/user/id/'
  };

  return this._rh._makeRequest(opts, callback);
};

User.prototype.getBasicInfo = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/user/basic_info/'
  };

  return this._rh._makeRequest(opts, callback);
};

User.prototype.getAdditionalInfo = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/user/additional_info/'
  };

  return this._rh._makeRequest(opts, callback);
};

User.prototype.getEmployment = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/user/employment/'
  };

  return this._rh._makeRequest(opts, callback);
};

User.prototype.getInvestmentProfile = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/user/investment_profile/'
  };

  return this._rh._makeRequest(opts, callback);
};

User.prototype.getIdentityMismatch = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/user/identity_mismatch/'
  };

  return this._rh._makeRequest(opts, callback);
};

User.prototype.getCipQuestions = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/user/cip_questions/'
  };

  return this._rh._makeRequest(opts, callback);
};
