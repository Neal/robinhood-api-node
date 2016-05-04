'use strict';

let Ach = module.exports = function(rh) {
  this._rh = rh;
};

Ach.prototype.getRelationships = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/ach/relationships/'
  };

  return this._rh._makeRequest(opts, callback);
};

Ach.prototype.getRelationship = function(id, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/ach/relationships/' + id + '/'
  };

  return this._rh._makeRequest(opts, callback);
};

Ach.prototype.getTransfers = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/ach/transfers/'
  };

  return this._rh._makeRequest(opts, callback);
};

Ach.prototype.getTransfer = function(id, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/ach/transfers/' + id + '/'
  };

  return this._rh._makeRequest(opts, callback);
};

Ach.prototype.getDepositSchedules = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/ach/deposit_schedules/'
  };

  return this._rh._makeRequest(opts, callback);
};

Ach.prototype.getDepositSchedule = function(id, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/ach/deposit_schedules/' + id + '/'
  };

  return this._rh._makeRequest(opts, callback);
};

Ach.prototype.getQueuedDeposit = function(callback) {
  let opts = {
    method: 'GET',
    endpoint: '/ach/iav/queued_deposit/'
  };

  return this._rh._makeRequest(opts, callback);
};

Ach.prototype.verifyMicroDeposits = function(
    id, amountOne, amountTwo, callback) {
  let opts = {
    method: 'POST',
    endpoint: '/ach/relationships/' + id + '/micro_deposits/veryify/',
    form: {
      first_amount_cents: amountOne, // eslint-disable-line camelcase
      second_amount_cents: amountTwo // eslint-disable-line camelcase
    }
  };

  return this._rh._makeRequest(opts, callback);
};

Ach.prototype.getBank = function(routingNumber, callback) {
  let opts = {
    method: 'GET',
    endpoint: '/ach/banks/' + routingNumber + '/'
  };

  return this._rh._makeRequest(opts, callback);
};
