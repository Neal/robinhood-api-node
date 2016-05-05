'use strict';

const nock = require('nock');
const should = require('should');

const shared = require('./shared');

const Robinhood = require('..');

describe('Documents', () => {

  let rh;

  shared.commonInit();

  before(done => {
    rh = new Robinhood(null, err => {
      should.not.exist(err);
      should.exist(rh._accountNumber);
      done();
    });
  });

  it('should get requests', () => {
    nock(rh._apiRoot)
      .get('/upload/document_requests/')
      .reply(200);

    return rh.documents.requests().should.be.fulfilled();
  });

  it('should get all documents', () => {
    nock(rh._apiRoot)
      .get('/documents/')
      .reply(200);

    return rh.documents.getAll().should.be.fulfilled();
  });

  it('should get info', () => {
    const id = '3bb01433-4e4d-4905-b2de-e77ad596b63b';

    nock(rh._apiRoot)
      .get('/documents/' + id + '/')
      .reply(200);

    return rh.documents.getInfo(id).should.be.fulfilled();
  });

  it('should get url', () => {
    const id = '3bb01433-4e4d-4905-b2de-e77ad596b63b';

    nock(rh._apiRoot)
      .get('/documents/' + id + '/download/')
      .reply(200);

    return rh.documents.getUrl(id).should.be.fulfilled();
  });

});
