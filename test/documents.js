'use strict';

const chai = require('chai');
const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Documents', () => {

  let rh;

  shared.commonInit();

  beforeEach(done => {
    rh = new Robinhood({authToken: shared.testAuthToken}, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get requests', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/upload/document_requests/')
      .reply(200);

    return rh.documents.requests().should.be.fulfilled();
  });

  it('should get all documents', () => {
    nock(rh._apiRoot, shared.reqHeaders)
      .get('/documents/')
      .reply(200);

    return rh.documents.getAll().should.be.fulfilled();
  });

  it('should get info', () => {
    const id = '3bb01433-4e4d-4905-b2de-e77ad596b63b';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/documents/' + id + '/')
      .reply(200);

    return rh.documents.getInfo(id).should.be.fulfilled();
  });

  it('should get url', () => {
    const id = '3bb01433-4e4d-4905-b2de-e77ad596b63b';

    nock(rh._apiRoot, shared.reqHeaders)
      .get('/documents/' + id + '/download/')
      .reply(200);

    return rh.documents.getUrl(id).should.be.fulfilled();
  });

});
