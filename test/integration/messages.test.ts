import { assert } from 'chai';
import { addDays, isAfter, parseISO, startOfDay } from 'date-fns';
import type { Express } from 'express';
import request from 'supertest';
import { AlreadyHasActiveConnectionError, createConnection, Connection } from 'typeorm';
import { createApp } from '../../src/app';
import { Message } from '../../src/data/entities/message.entity';
import { USER_ID_HEADER } from '../../src/middleware/auth';
import users from '../../src/data/migrations/seed/users.json';

describe('Messages API Integration Tests', () => {
  let app: Express;
  let connection: Connection;
  before(async () => {
    try {
      connection = await createConnection();
    } catch (err) {
      if (!(err instanceof AlreadyHasActiveConnectionError)) {
        throw err;
      }
    }
    app = createApp();
  });

  after(async () => {
    if (connection) {
      await connection.close();
    }
  });

  describe('GET /api/messages', () => {
    it('responds with 400 if no X-User-Id header present', (done) => {
      request(app).get('/api/messages').expect(400, done);
    });

    it('responds with 400 if no X-User-Id header invalid', (done) => {
      request(app)
        .get('/api/messages')
        .set({ [USER_ID_HEADER]: 'foobar' })
        .expect(400, done);
    });

    it('responds with json list of messages', (done) => {
      request(app)
        .get('/api/messages')
        .set({ [USER_ID_HEADER]: 1 })
        .expect(200)
        .then((resp) => {
          assert.isArray(resp.body);
          assert.isAtLeast(1, resp.body.length);
          const [message] = resp.body as Message[];
          assert.isNumber(message.id);
          assert.isString(message.dateSent);
          assert.isObject(message.sender);
          assert.isNumber(message.sender.id);
          assert.isString(message.sender.username);
          assert.isUndefined(message.recipient);
          assert.isUndefined(message.recipientId);
          assert.isString(message.text);
        })
        .finally(done);
    });

    it('responds with json list with default limit of 100', (done) => {
      request(app)
        .get('/api/messages')
        .set({ [USER_ID_HEADER]: 1 })
        .expect(200)
        .then((resp) => {
          assert.isArray(resp.body);
          assert.lengthOf(resp.body, 100);
        })
        .finally(done);
    });

    it('responds with json list with limit', (done) => {
      const limit = 5;
      request(app)
        .get('/api/messages')
        .query({ limit })
        .set({ [USER_ID_HEADER]: 1 })
        .expect(200)
        .then((resp) => {
          assert.isArray(resp.body);
          assert.lengthOf(resp.body, limit);
        })
        .finally(done);
    });

    it('responds with json list of messages all in range of daysElapsed', (done) => {
      const daysElapsed = 10;
      request(app)
        .get('/api/messages')
        .set({ [USER_ID_HEADER]: 1 })
        .query({ daysElapsed })
        .expect(200)
        .then((resp) => {
          assert.isArray(resp.body);
          resp.body.forEach((message: { dateSent: string }) => {
            assert.isTrue(isAfter(parseISO(message.dateSent), startOfDay(addDays(new Date(), -1 * daysElapsed))));
          });
        })
        .finally(done);
    });

    it('responds with empty json list if user does not exist', (done) => {
      request(app)
        .get('/api/messages')
        .set({ [USER_ID_HEADER]: users.length + 1 })
        .expect(200)
        .then((resp) => {
          assert.isArray(resp.body);
          assert.lengthOf(resp.body, 0);
        })
        .finally(done);
    });
  });

  describe('GET /api/messages/{senderId}', () => {
    // TODO
  });

  describe('POSt /api/messages', () => {
    // TODO
  });
});
