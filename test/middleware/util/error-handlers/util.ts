import { Response } from 'express';
import { assert } from 'chai';
import { SinonSpy } from 'sinon';

export const assertErrResponse = (
  err: Error,
  res: Response,
  nextSpy: SinonSpy,
  resJsonSpy: SinonSpy,
  expectedStatusCode: number
): void => {
  assert.isTrue(nextSpy.notCalled);
  assert.equal(res.statusCode, expectedStatusCode);
  assert.isTrue(resJsonSpy.called);
  assert.isTrue(
    resJsonSpy.calledWithExactly({
      statusCode: expectedStatusCode,
      message: err.message,
    })
  );
};
