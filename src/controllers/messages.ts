import { Message } from '../data/entities/message.entity';
import { MessagesRepository } from '../repositories/messages.repository';

export default class MessagesController {
  private readonly repository: MessagesRepository;

  constructor(repository: MessagesRepository) {
    this.repository = repository;
  }

  public async getMessagesForRecipient(recipientId: number): Promise<Message[]> {
    return this.repository.find({ where: { recipient: recipientId } });
  }
}
