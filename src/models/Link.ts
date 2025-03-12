import mongoose, { Schema, Document } from 'mongoose';

export interface ILink extends Document {
  title: string;
  url: string;
  icon: string;
  image?: string;
  featured: boolean;
  order: number;
  category: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
    image: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    category: { type: String, default: 'geral' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Link || mongoose.model<ILink>('Link', LinkSchema); 