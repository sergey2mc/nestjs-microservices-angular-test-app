import { Schema, Types } from 'mongoose';

export const DocSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
