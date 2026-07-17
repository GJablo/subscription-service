import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be a positive number"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "GBP", "KES", "AUD"], // Add more currencies as needed
      default: "KES",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["entertainment", "utilities", "health", "education", "other"],
      required: [true, "Subscription category is required"],
    },
    paymentMethod: {
      type: String,
      enum: [
        "credit_card",
        "debit_card",
        "paypal",
        "bank_transfer",
        "mobile_money",
      ],
      required: [true, "Payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date cannot be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true, // Index for faster queries
    },
  },
  { timestamps: true },
);

// Auto-calculate renewalDate if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const frequencyMap = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    const daysToAdd = frequencyMap[this.frequency] || 0;
    this.renewalDate = new Date(
      this.startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000,
    );
  }

  // Auto-calculate status if renewal date has passed
  if (this.renewalDate && this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

export default mongoose.model("Subscription", subscriptionSchema);
