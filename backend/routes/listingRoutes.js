import express from 'express';
import Listing from '../models/Listing.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Create new listing
router.post('/', upload.fields([
  { name: 'images', maxCount: 12 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const { features, ...rest } = req.body;
    const listingData = {
      ...rest,
      features: JSON.parse(features),
      images: req.files['images']?.map(file => file.filename),
      video: req.files['video']?.[0]?.filename
    };

    const listing = new Listing(listingData);
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all listings with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, ...filters } = req.query;
    const query = {};
    
    // Apply search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Apply filters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        if (key === 'priceMin' || key === 'priceMax') {
          query.price = query.price || {};
          if (key === 'priceMin') query.price.$gte = Number(filters[key]);
          if (key === 'priceMax') query.price.$lte = Number(filters[key]);
        } else {
          query[key] = filters[key];
        }
      }
    });

    const listings = await Listing.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Listing.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      listings,
      total,
      totalPages,
      currentPage: Number(page)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update listing
router.put('/:id', upload.fields([
  { name: 'images', maxCount: 12 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const { features, ...rest } = req.body;
    const updateData = {
      ...rest,
      features: JSON.parse(features),
      $push: { images: { $each: req.files['images']?.map(file => file.filename) || [] } }
    };

    if (req.files['video']?.[0]?.filename) {
      updateData.video = req.files['video'][0].filename;
    }

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete listing
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    
    // Delete associated files
    listing.images.forEach(image => {
      fs.unlink(`public/uploads/${image}`, err => {
        if (err) console.error('Error deleting image:', err);
      });
    });
    
    if (listing.video) {
      fs.unlink(`public/uploads/${listing.video}`, err => {
        if (err) console.error('Error deleting video:', err);
      });
    }

    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;