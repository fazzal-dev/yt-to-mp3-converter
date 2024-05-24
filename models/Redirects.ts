// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const redirectSchema = new mongoose.Schema({
  fromUrl: {
    type: String,
    required: true,
    unique: true,
  },
  toUrl: {
    type: String,
    required: true,
  },
  statusCode: {
    type: Number,
    default: 302,
  },
});

export default mongoose.models.redirects || mongoose.model('redirects', redirectSchema);
