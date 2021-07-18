import sinon from 'sinon';
import createError from 'http-errors';
import notFoundErrHandler from '../../../../src/util/error-handlers/not-found';
import { createMockReq, createMockRes } from '../../../util/express';
import { assertErrResponse } from './util';

describe('Authentication Middleware', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should respond with standard 500 if received error has no statusCode', () => {
    const nextSpy = sinon.spy();
    const resJsonSpy = sinon.spy();
    const res = createMockRes({
      json: resJsonSpy,
    });
    notFoundErrHandler(createMockReq(), res, nextSpy);
    assertErrResponse(createError(404), res, nextSpy, resJsonSpy, 404);
  });
});
