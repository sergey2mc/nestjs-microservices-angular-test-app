import { Document, Types } from 'mongoose';

export class User {
  readonly _id?: Types.ObjectId;
  name: string;
  birthDate: Date;
  birthCountry: string;
  language: string;
  telephone: string;

}

export type UserDoc = User & Document;
