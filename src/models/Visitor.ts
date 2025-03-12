import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitor extends Document {
  referrer: string;
  userAgent: string;
  ip: string;
  clickedLink?: string;
  createdAt: Date;
}

const VisitorSchema: Schema = new Schema(
  {
    referrer: { type: String, default: 'direct' },
    userAgent: { type: String },
    ip: { type: String },
    clickedLink: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema); 