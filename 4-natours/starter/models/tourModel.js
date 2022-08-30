const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The tour name is required'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'The tour price is required'],
  },

  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
