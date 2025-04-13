const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

app.get('/uploads', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) return res.status(500).send("Failed to list files");
    res.send(files);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
