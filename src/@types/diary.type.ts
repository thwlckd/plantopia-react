import { Timestamp } from 'firebase/firestore';

export interface Diary {
  id: string;
  userEmail: string;
  content: string;
  postedAt: Timestamp;
  tags: string[];
  title: string;
  imgUrls: string[];
}
