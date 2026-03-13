import mongoose from "mongoose";

const apiLogSchema = new mongoose.Schema(
  {
    method: {
      type: String,
    },

    endpoint: {
      type: String,
      required: true,
      trim: true,
      index: "text", 
    },

    statusCode: {
      type: Number,
      required: true,
      min: 100,
      max: 599,
      index: true, 
    },

    duration: {
      type: Number,
      required: true,
      min: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true, 
    },

    ip: {
      type: String,
      trim: true,
      index: true, 
    },

    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt এবং updatedAt অটো আসবে
  }
);

// সবচেয়ে গুরুত্বপূর্ণ ইনডেক্সগুলো (এগুলো না থাকলে query অনেক স্লো হবে)
apiLogSchema.index({ createdAt: -1 }); // default sort (নতুন থেকে পুরানো)

apiLogSchema.index({ statusCode: 1, createdAt: -1 }); // status + sort
apiLogSchema.index({ method: 1, createdAt: -1 });     // method + sort

// search-এর জন্য compound text index (username/email + endpoint + method)
apiLogSchema.index(
  {
    "user.email": "text",
    "user.username": "text",
    endpoint: "text",
    method: "text",
  },
  { default_language: "none" } 
);


apiLogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 1 * 60 * 60 } //
  
);

export const ApiLog = mongoose.model("ApiLog", apiLogSchema);