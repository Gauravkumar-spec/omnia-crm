import express from 'express';
import Agent from '../models/Agent.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer setup for saving uploaded images to 'public/uploads'
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

const upload = multer({ storage });

const router = express.Router();

// Create new agent with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const image = req.file ? req.file.filename : null;

    const agent = new Agent({ name, email, phone, image });
    const savedAgent = await agent.save();

    res.status(201).json(savedAgent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all agents
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
