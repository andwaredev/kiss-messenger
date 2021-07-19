import type { Request, Response } from 'express';

export const createMockReq = (mockReq: Partial<Request> = {}): Request => {
  const { headers = {}, ...mockReqRest } = mockReq;
  return {
    headers: Object.keys(headers).reduce(
      (acc, key) => ({
        ...acc,
        [key.toLowerCase()]: headers[key],
      }),
      {}
    ),
    ...mockReqRest,
  } as Request;
};

export const unsetResLocals = {};
export const createMockRes = (mockRes: Partial<Response> = {}): Response => {
  return {
    json: () => {},
    status(status: number): Response {
      this.statusCode = status;
      return this;
    },
    locals: unsetResLocals,
    ...mockRes,
  } as Response;
};
