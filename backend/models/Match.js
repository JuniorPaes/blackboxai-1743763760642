const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

const matchSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 2']
  }],
  matchedAt: {
    type: Date,
    default: Date.now
  },
  messages: [messageSchema],
  lastMessage: {
    type: Date,
    default: Date.now
  }
});

// Validate that matches only have 2 users
function arrayLimit(val) {
  return val.length === 2;
}

// Update lastMessage timestamp when new message is added
matchSchema.pre('save', function(next) {
  if (this.isModified('messages') && this.messages.length > 0) {
    this.lastMessage = this.messages[this.messages.length - 1].sentAt;
  }
  next();
});

module.exports = mongoose.model('Match', matchSchema);