const Subscription = require('../schemas/subscription');

// Create a subscription
async function createSubscription(data) {
  try {
    const sub = await Subscription.create(data);
    return sub;
  } catch (err) {
    throw err;
  }
}

// Get subscriptions by user ID
async function getSubscriptionsByUser(userId) {
  try {
    const subs = await Subscription.find({ userId });
    return subs;
  } catch (err) {
    throw err;
  }
}

// Update subscription by ID
async function updateSubscription(id, updates) {
  try {
    const sub = await Subscription.findByIdAndUpdate(id, updates, { new: true });
    return sub;
  } catch (err) {
    throw err;
  }
}

// Delete subscription by ID
async function deleteSubscription(id) {
  try {
    await Subscription.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createSubscription,
  getSubscriptionsByUser,
  updateSubscription,
  deleteSubscription
};
