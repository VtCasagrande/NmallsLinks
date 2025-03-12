import mongoose from 'mongoose';

const ClickSchema = new mongoose.Schema({
  linkId: {
    type: String,
    required: true,
  },
  linkTitle: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Click || mongoose.model('Click', ClickSchema); 