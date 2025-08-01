import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  requirement: String,
  budgetMin: String,
  budgetMax: String,
  location: String,
  propertyType: String,
  followUpDate: String,
  source: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
