import { Document, Types } from 'mongoose';

export class Doc {
  readonly _id?: Types.ObjectId;
  title: string;
  userId: Types.ObjectId;
}

export type DocDoc = Doc & Document;
