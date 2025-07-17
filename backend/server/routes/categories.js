const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create category
router.post(
  '/',
  [body('name').notEmpty().withMessage('Category name is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
