import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  propertyType: { type: String, required: true, enum: ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Commercial', 'Land'] },
  listingType: { type: String, required: true, enum: ['For Sale', 'For Rent', 'Pre-sale', 'Foreclosure'] },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: String, required: true, enum: ['Studio', '1', '2', '3', '4', '5+'] },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  description: { type: String },
  features: [{ type: String }],
  images: [{ type: String }],
  video: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;