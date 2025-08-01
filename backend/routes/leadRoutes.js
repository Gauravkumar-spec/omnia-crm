import express from 'express';
import Lead from '../models/Lead.js';

const router = express.Router();

// POST: Create Lead
router.post('/add', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json({ message: 'Lead added successfully', lead: savedLead });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add lead' });
  }
});

// GET: All Leads
// GET: All Leads
router.get('/all', async (req, res) => {
  try {
    const leads = await Lead.find()
      .sort({ createdAt: -1 })     // Sort by newest
      .limit(100)                  // Limit results (tune based on use-case)
      .maxTimeMS(15000);           // Give query more time to finish
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});


export default router;












// // routes/leadRoutes.js
// import express from 'express';
// import multer from 'multer';
// import csvParser from 'csv-parser';  // npm install csv-parser
// import Lead from '../models/Lead.js';
// import fs from 'fs';
// import path from 'path';

// const router = express.Router();

// // Multer setup for file upload (in memory or disk)
// const upload = multer({ dest: 'uploads/' });

// // POST: Upload CSV
// router.post('/upload-csv', upload.single('file'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'CSV file is required' });
//   }

//   const leads = [];
//   const filePath = path.resolve(req.file.path);

//   try {
//     fs.createReadStream(filePath)
//       .pipe(csvParser())
//       .on('data', (row) => {
//         // Map CSV columns to your Lead model fields
//         leads.push({
//           name: row.name,
//           mobile: row.mobile,
//           email: row.email,
//           requirement: row.requirement,
//           budgetMin: row.budgetMin,
//           budgetMax: row.budgetMax,
//           location: row.location,
//           propertyType: row.propertyType,
//           followUpDate: row.followUpDate,
//           source: row.source,
//           notes: row.notes,
//         });
//       })
//       .on('end', async () => {
//         // Save all leads to DB
//         try {
//           await Lead.insertMany(leads);
//           // Delete the uploaded file after parsing
//           fs.unlinkSync(filePath);
//           res.json({ message: 'CSV uploaded and leads saved successfully' });
//         } catch (err) {
//           res.status(500).json({ error: 'Error saving leads to database' });
//         }
//       });
//   } catch (error) {
//     res.status(500).json({ error: 'Error processing CSV file' });
//   }
// });

// export default router;
