const Payment = require('../schemas/payment');

async function createPayment(data) {
  return await Payment.create(data);
}

async function getPaymentsByUser(userId) {
  return await Payment.find({ userId }).populate('subscriptionId');
}

async function updatePayment(id, updates) {
  return await Payment.findByIdAndUpdate(id, updates, { new: true });
}

async function deletePayment(id) {
  return await Payment.findByIdAndDelete(id);
}

module.exports = {
  createPayment, getPaymentsByUser, updatePayment, deletePayment
};