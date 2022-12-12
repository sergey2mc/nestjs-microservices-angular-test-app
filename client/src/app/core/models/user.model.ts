import { Doc } from './doc.model';

export interface User {
  _id?: string;
  name: string;
  birthDate: Date;
  birthCountry: string;
  language: string;
  telephone: string;

  docs?: Doc[];
}
