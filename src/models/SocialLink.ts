import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialLink extends Document {
  platform: string;
  url: string;
  icon: string;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema: Schema = new Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.SocialLink || mongoose.model<ISocialLink>('SocialLink', SocialLinkSchema); 