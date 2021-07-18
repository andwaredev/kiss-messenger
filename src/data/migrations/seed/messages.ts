import { sentence } from 'txtgen';
import { Message } from '../../entities/message.entity';
import users from './users.json';

/**
 * getRandomDate
 * Courtesy of Tomasz Nurkiewicz and Paolo Moretti
 * https://stackoverflow.com/a/9035732
 */
const getRandomDate = () => {
  const earliestMessageDate = new Date(2021, 0, 1);
  const now = new Date();
  return new Date(earliestMessageDate.getTime() + Math.random() * (now.getTime() - earliestMessageDate.getTime()));
};

const MESSAGE_COUNT = users.length * 300; // roughly 300 messages per user
export default Array(MESSAGE_COUNT)
  .fill(null)
  .map((_, i) => {
    const sender = Math.ceil(Math.random() * users.length);
    const validRecipients = [...Array(users.length).keys()].map((i) => i + 1).filter((id) => sender !== id);
    const recipient = validRecipients[Math.floor(Math.random() * validRecipients.length)];
    const dateSent = getRandomDate();
    return {
      id: i + 1,
      text: sentence(),
      dateSent,
      sender,
      recipient,
    } as unknown as Message;
  });
