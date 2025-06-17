const express = require('express');
const router = express.Router();
const subController = require('../models/subscription');

// CREATE
router.post('/', async (req, res) => {
  try {
    const newSub = await subController.createSubscription(req.body);
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (by user ID)
router.get('/user/:userId', async (req, res) => {
  try {
    const subs = await subController.getSubscriptionsByUser(req.params.userId);
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await subController.updateSubscription(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await subController.deleteSubscription(req.params.id);
    res.send('Subscription deleted');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
