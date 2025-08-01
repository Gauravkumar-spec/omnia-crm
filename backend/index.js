import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import listingRouter from './routes/listingRoutes.js';
import agentRouter from './routes/agentRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// API Routes
app.use('/api/listings', listingRouter);
app.use('/api/agents', agentRouter);
app.use('/api/leads', leadRoutes);

// Serve React build files
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// SPA fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Connect to DB then start server
mongoose.connect('mongodb://localhost:27017/realestate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
