const express = require('express');
const router = express.Router();
const db = require('../library/database'); // Adjust the path as necessary

// Display login form
router.get('/', (req, res) => {
  res.render('admin-dashboard');
});



module.exports = router;