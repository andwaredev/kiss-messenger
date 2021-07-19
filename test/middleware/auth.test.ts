import type { Response } from 'express';
import { assert } from 'chai';
import { HttpError } from 'http-errors';
import sinon, { SinonSpy } from 'sinon';
import authMiddleware, { USER_ID_HEADER } from '../../src/middleware/auth';
import { createMockReq, createMockRes, unsetResLocals } from '../test-util/express';

describe('Authentication Middleware', () => {
  afterEach(() => {
    sinon.restore();
  });

  const assertBadRequestErr = (res: Response, nextSpy: SinonSpy): void => {
    assert.isTrue(nextSpy.calledOnce);
    const [err] = nextSpy.getCall(0).args;
    assert.isTrue(err instanceof HttpError);
    assert.isTrue(err.statusCode === 400);
    assert.equal(res.locals, unsetResLocals);
  };

  it('should call next with 400 http error if no user id header provided', () => {
    const req = createMockReq();
    const res = createMockRes();
    const nextSpy = sinon.spy();
    authMiddleware(req, res, nextSpy);
    assertBadRequestErr(res, nextSpy);
  });

  it('should call next with 400 http error if user id header value not an integer', () => {
    const req = createMockReq({
      headers: {
        [USER_ID_HEADER]: 'not-an-int',
      },
    });
    const res = createMockRes();
    const nextSpy = sinon.spy();
    authMiddleware(req, res, nextSpy);
    assertBadRequestErr(res, nextSpy);
  });

  it('should set res locals user and call next if user id header valid', () => {
    const userId = 1;
    const req = createMockReq({
      headers: {
        [USER_ID_HEADER]: `${userId}`,
      },
    });
    const res = createMockRes();
    const nextSpy = sinon.spy();
    authMiddleware(req, res, nextSpy);
    assert.isTrue(nextSpy.calledOnce);
    assert.isEmpty(nextSpy.getCall(0).args);
    assert.deepEqual(res.locals.user, {
      id: userId,
    });
  });
});
