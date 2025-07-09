
const express = require('express');
const router  = express.Router();
const sub     = require('../models/subscription');


router.post('/', async (req, res) => {
  try {
    const newSub = await sub.createSubscription(req.body);
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/:userId', async (req, res) => {
  try {
    const subs = await sub.getSubscriptionsByUser(req.params.userId);
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await sub.updateSubscription(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await sub.deleteSubscription(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
