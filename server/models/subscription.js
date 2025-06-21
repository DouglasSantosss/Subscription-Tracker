
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  notes: {
    type: String
  },
  cost: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);


async function createSubscription(data) {
  try {
    const sub = await Subscription.create(data);
    return sub;
  } catch (err) {
    throw err;
  }
}


async function getSubscriptionsByUser(userId) {
  try {
    const subs = await Subscription.find({ userId });
    return subs;
  } catch (err) {
    throw err;
  }
}

async function updateSubscription(id, updates) {
  try {
    const sub = await Subscription.findByIdAndUpdate(id, updates, { new: true });
    return sub;
  } catch (err) {
    throw err;
  }
}

async function deleteSubscription(id) {
  try {
    await Subscription.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createSubscription, getSubscriptionsByUser, updateSubscription, deleteSubscription
};
