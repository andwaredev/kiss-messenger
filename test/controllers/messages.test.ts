import { assert } from 'chai';
import { addDays, startOfDay } from 'date-fns';
import sinon from 'sinon';
import { FindConditions, FindManyOptions } from 'typeorm';
import MessagesController from '../../src/controllers/messages';
import { Message } from '../../src/data/entities/message.entity';
import { MessagesRepository } from '../../src/repositories/messages.repository';
import { MoreThanDate } from '../../src/util/typeorm';

const MOCK_RECIPIENT_ID = 1;
const MOCK_SENDER_ID = 2;
describe('Messages Controller', () => {
  const sandbox = sinon.createSandbox();
  afterEach(() => {
    sandbox.useFakeTimers();
    sandbox.restore();
  });

  const findSpy = sandbox.spy((_?: FindManyOptions<Message>): Promise<Message[]> => Promise.resolve([]));
  const mockRepository: MessagesRepository = {
    find: findSpy,
  };
  const messagesController = new MessagesController(mockRepository);

  describe('getMessages', () => {
    afterEach(() => {
      findSpy.resetHistory();
    });

    const baseExpectedQueryOpts: FindManyOptions<Message> = {
      where: {},
      order: { dateSent: 'DESC' },
      join: { alias: 'message' },
      take: 100,
    };

    const senderJoin = {
      alias: 'message',
      leftJoinAndSelect: {
        sender: 'message.sender',
      },
    };

    it('should return most recent 100 messages for provided recipient', () => {
      messagesController.getMessages({ recipient: MOCK_RECIPIENT_ID });
      assert.isTrue(findSpy.calledOnce);
      const [queryOptions] = findSpy.getCall(0).args;
      assert.deepEqual(queryOptions, {
        ...baseExpectedQueryOpts,
        where: {
          recipient: MOCK_RECIPIENT_ID,
        },
        join: senderJoin,
      });
    });

    it('should return most recent X messages for provided limit and recipient', () => {
      const limit = 5;
      messagesController.getMessages({
        recipient: MOCK_RECIPIENT_ID,
        limit,
      });
      assert.isTrue(findSpy.calledOnce);
      const [queryOptions] = findSpy.getCall(0).args;
      assert.deepEqual(queryOptions, {
        ...baseExpectedQueryOpts,
        where: {
          recipient: MOCK_RECIPIENT_ID,
        },
        join: senderJoin,
        take: limit,
      });
    });

    it('should return messages for past X days messages for provided daysElapsed and recipient', () => {
      const daysElapsed = 30;
      messagesController.getMessages({
        recipient: MOCK_RECIPIENT_ID,
        daysElapsed,
      });
      assert.isTrue(findSpy.calledOnce);
      const [queryOptions] = findSpy.getCall(0).args;
      assert.equal((queryOptions?.where as FindConditions<Message>).recipient as number, MOCK_RECIPIENT_ID);
      assert.deepEqual(
        (queryOptions?.where as FindConditions<Message>).dateSent,
        MoreThanDate(startOfDay(addDays(new Date(), -1 * daysElapsed)))
      );
      assert.deepEqual(queryOptions?.order, baseExpectedQueryOpts.order);
      assert.deepEqual(queryOptions?.join, senderJoin);
    });

    it('should return most recent 100 messages for provided recipient and sender', () => {
      messagesController.getMessages({ recipient: MOCK_RECIPIENT_ID, sender: MOCK_SENDER_ID });
      assert.isTrue(findSpy.calledOnce);
      const [queryOptions] = findSpy.getCall(0).args;
      assert.deepEqual(queryOptions, {
        ...baseExpectedQueryOpts,
        where: {
          recipient: MOCK_RECIPIENT_ID,
          sender: MOCK_SENDER_ID,
        },
      });
    });

    it('should return most recent X messages for provided limit, recipient, and sender', () => {
      const limit = 5;
      messagesController.getMessages({
        recipient: MOCK_RECIPIENT_ID,
        sender: MOCK_SENDER_ID,
        limit,
      });
      assert.isTrue(findSpy.calledOnce);
      const [queryOptions] = findSpy.getCall(0).args;
      assert.deepEqual(queryOptions, {
        ...baseExpectedQueryOpts,
        where: {
          recipient: MOCK_RECIPIENT_ID,
          sender: MOCK_SENDER_ID,
        },
        take: limit,
      });
    });

    it('should return messages for past X days messages for provided daysElapsed, recipient, and sender', () => {
      const daysElapsed = 30;
      messagesController.getMessages({
        recipient: MOCK_RECIPIENT_ID,
        sender: MOCK_SENDER_ID,
        daysElapsed,
      });
      assert.isTrue(findSpy.calledOnce);
      const [queryOptions] = findSpy.getCall(0).args;
      assert.equal((queryOptions?.where as FindConditions<Message>).recipient as number, MOCK_RECIPIENT_ID);
      assert.equal((queryOptions?.where as FindConditions<Message>).sender as number, MOCK_SENDER_ID);
      assert.deepEqual(
        (queryOptions?.where as FindConditions<Message>).dateSent,
        MoreThanDate(startOfDay(addDays(new Date(), -1 * daysElapsed)))
      );
      assert.deepEqual(queryOptions?.order, baseExpectedQueryOpts.order);
    });
  });
});
