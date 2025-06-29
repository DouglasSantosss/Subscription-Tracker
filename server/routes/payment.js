const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

router
.post('/', async (req, res) => {
    try {
        const payment = await Payment.createPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


.get('/:id', async (req, res) => {
    try {
        const payments = await Payment.getAllPayments();
        res.json(payments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


.put('/:id', async (req, res) => {
    try {
        const updated = await Payment.updatePayment(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


.delete('/:id', async (req, res) => {
    try {
        const deleted = await Payment.deletePayment(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
