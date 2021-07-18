import { FindManyOptions, getRepository } from 'typeorm';
import { Message } from '../data/entities/message.entity';

export class MessagesRepository {
  public async find(options?: FindManyOptions<Message>): Promise<Message[]> {
    const repository = getRepository(Message);
    return repository.find(options);
  }

  public async create(senderId: number, recipientId: number, text: string): Promise<Message> {
    const message = new Message();
    message.recipientId = recipientId;
    message.senderId = senderId;
    message.text = text;
    const repository = getRepository(Message);
    return repository.save(message);
  }
}
