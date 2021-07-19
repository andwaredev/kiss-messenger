import { assert } from 'chai';
import createError from 'http-errors';
import sinon from 'sinon';
import generalErrHandler from '../../../../src/util/error-handlers/catch-all';
import { createMockReq, createMockRes } from '../../../test-util/express';
import { assertErrResponse } from './util';

describe('Authentication Middleware', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should call next with error if request headers already sent', () => {
    const err = new Error('foobar');
    const nextSpy = sinon.spy();
    generalErrHandler(
      err,
      createMockReq(),
      createMockRes({
        headersSent: true,
      }),
      nextSpy
    );
    assert.isTrue(nextSpy.calledOnce);
    assert.isTrue(nextSpy.calledWithExactly(err));
  });

  it('should respond with standard 500 if received error has no statusCode', () => {
    const err = new Error('foobar');
    const nextSpy = sinon.spy();
    const resJsonSpy = sinon.spy();
    const res = createMockRes({
      json: resJsonSpy,
    });
    generalErrHandler(err, createMockReq(), res, nextSpy);
    assertErrResponse(err, res, nextSpy, resJsonSpy, 500);
  });

  it('should respond with provided err statusCode if received', () => {
    const err = createError(400);
    const nextSpy = sinon.spy();
    const resJsonSpy = sinon.spy();
    const res = createMockRes({
      json: resJsonSpy,
    });
    generalErrHandler(err, createMockReq(), res, nextSpy);
    assertErrResponse(err, res, nextSpy, resJsonSpy, err.statusCode);
  });
});
