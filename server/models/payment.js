const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true},
  amount: { type: Number, required: true},
  date: { type: Date, required: true },
  method: { type: String, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);


async function createPayment(data) {
  return await Payment.create(data);
}


async function updatePayment(id, data) {
  return await Payment.findByIdAndUpdate(id, data, { new: true });
}


async function deletePayment(id) {
  return await Payment.findByIdAndDelete(id);
}


async function getAllPayments() {
  return await Payment.find();
}

module.exports = {
  createPayment, updatePayment, deletePayment, getAllPayments
};