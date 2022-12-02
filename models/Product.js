const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxlength: [100, "name never pass 100 characters"],
  },
 
  price: {
    type: Number,
    required: [true, "please enter product price"],

    maxlength: [4, "price never pass 4 characters"],
    default: 0.0,
  },
  
  createtAt: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: [false, "enter productNumber "],
    maxlength: [5, "cannot pass 5 characters"],
    default: 0,
  },
 
  
    


 images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true
      },
    },
  ],
 
  
});
module.exports = mongoose.model("Product", productSchema);
