const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');

router.get('/data', async (req, res) => {
  try {
    const filesData = await filesController.getFormattedFilesData();
    res.json(filesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const filesData = await filesController.getFilesList();
    res.json(filesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
