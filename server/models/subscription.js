const mongoose = require('mongoose');
const { Schema } = mongoose;


const subscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String, required: true},
  category: String,
  notes: String,
  cost: Number
}, { timestamps: true });


const Subscription = mongoose.model('Subscription', subscriptionSchema);


async function createSubscription(data) {
  
  return await Subscription.create(data);
}

async function getSubscriptionsByUser(userId) {
  return await Subscription.find({ userId });
}

async function updateSubscription(id, data) {
  return await Subscription.findByIdAndUpdate(id, data, { new: true });
}

async function deleteSubscription(id) {
  return await Subscription.findByIdAndDelete(id);
}

module.exports = {
  createSubscription,
  getSubscriptionsByUser,
  updateSubscription,
  deleteSubscription
};
