import { addDays, startOfDay } from 'date-fns';
import { FindManyOptions } from 'typeorm';
import { Message } from '../data/entities/message.entity';
import { MessagesRepository } from '../repositories/messages.repository';
import { MoreThanDate } from '../util/typeorm';

export interface MessageFilterOptions {
  recipient?: number;
  sender?: number;
  daysElapsed?: number;
  limit?: number;
}

export default class MessagesController {
  private repository: MessagesRepository;

  constructor(repository: MessagesRepository) {
    this.repository = repository;
  }

  public async getMessages(options: MessageFilterOptions = {}): Promise<Message[]> {
    const { daysElapsed, limit = 100, recipient, sender } = options;
    const where: FindManyOptions<Message>['where'] = {};
    if (typeof daysElapsed === 'number') {
      where.dateSent = MoreThanDate(startOfDay(addDays(new Date(), -1 * daysElapsed)));
    }

    if (typeof recipient === 'number') {
      where.recipientId = recipient;
    }

    const join: FindManyOptions<Message>['join'] = {
      alias: 'message',
    };
    if (typeof sender === 'number') {
      where.senderId = sender;
    } else {
      // only show sender user info with message if list is not already filtered by a single sender
      join.leftJoinAndSelect = {
        sender: 'message.sender',
      };
    }

    const queryOpts: FindManyOptions<Message> = {
      where,
      join,
      order: { dateSent: 'DESC' },
    };

    if (limit) {
      queryOpts.take = limit;
    }

    // exclude foreign keys from response items
    queryOpts.select = ['id', 'text', 'dateSent'];

    return this.repository.find(queryOpts);
  }

  public async createMessage(senderId: number, recipientId: number, text: string): Promise<Message> {
    return this.repository.create(senderId, recipientId, text);
  }
}
