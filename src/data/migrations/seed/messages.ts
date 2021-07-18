import { sentence } from 'txtgen';
import { Message } from '../../entities/message.entity';
import users from './users.json';

const MESSAGE_COUNT = users.length * 300; // roughly 300 messages per user
export default Array(MESSAGE_COUNT)
  .fill(null)
  .map((_, i) => {
    const sender = Math.ceil(Math.random() * users.length);
    const validRecipients = [...Array(users.length).keys()].map((i) => i + 1).filter((id) => sender !== id);
    const recipient = validRecipients[Math.floor(Math.random() * validRecipients.length)];
    return {
      id: i + 1,
      text: sentence(),
      sender,
      recipient,
    } as unknown as Message;
  });
