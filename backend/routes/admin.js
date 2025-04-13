const express = require('express');
const multer = require('multer');
const Student = require('../models/Student');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

router.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

router.post('/upload', upload.single('file'), (req, res) => {
  res.send({ filename: req.file.filename });
});

module.exports = router;
