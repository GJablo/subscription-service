import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minlength: [3, 'Subscription name must be at least 3 characters long'],
    maxlength: [100, 'Subscription name must be at most 100 characters long'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['KSH', 'USD', 'EUR', 'GBP', 'INR'],
    default: 'KSH',
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    default: 'monthly',
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['news', 'sports', 'entertainment', 'education', 'technology', 'health', 'lifestyle', 'other'],
    default: 'other',
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['Mpesa', 'Airtel Money', 'credit_card', 'debit_card', 'paypal', 'bank_transfer'],
    default: 'Mpesa',
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Start date cannot be in the future',
    },
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'Renewal date must be after the start date',
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Index for faster lookups
  },
}, { timestamps: true });

// auto calculate renewal date based on frequency
subscriptionSchema.pre('save', function(next) {
  if (!this.renewalDate) {
    const renewalFrequency = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalFrequency[this.frequency]);
  }

  // auto update status if renewal date is in the past
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }
  next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
