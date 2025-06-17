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
