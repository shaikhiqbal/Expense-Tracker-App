import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitor extends Document {
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  visitTime: Date;
  fullName?: string;
  email?: string;
  feedback?: string;
}

const VisitorSchema: Schema<IVisitor> = new Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    referrer: {
      type: String,
    },
    visitTime: {
      type: Date,
      default: Date.now,
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    feedback: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVisitor>('Visitor', VisitorSchema);