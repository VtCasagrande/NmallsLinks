import mongoose from 'mongoose';

const VisitSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    default: 'direct',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Visit || mongoose.model('Visit', VisitSchema); 