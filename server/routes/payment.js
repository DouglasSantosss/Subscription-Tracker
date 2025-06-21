const express = require('express');
const router = express.Router();
const Payment = require('../schemas/payment');

router
.post('/', async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


.get('/:userId', async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId }).populate('subscriptionId');
    res.json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


.put('/:id', async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


.delete('/:id', async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
