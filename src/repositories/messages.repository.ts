import { FindManyOptions, getRepository } from 'typeorm';
import { Message } from '../data/entities/message.entity';

export class MessagesRepository {
  public async find(options?: FindManyOptions<Message>): Promise<Message[]> {
    const repository = getRepository(Message);
    return repository.find(options);
  }
}
