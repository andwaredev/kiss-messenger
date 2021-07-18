import { format } from 'date-fns';
import { MoreThan } from 'typeorm';

export const MoreThanDate = (date: Date) => MoreThan(format(date, 'yyyy-MM-dd HH:MM:SS'));
