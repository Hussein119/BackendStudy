const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true, //remove whitespaces
  },
  duration: {
    type: Number,
    //required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    //required: [true, 'A tourst have a group size'],
  },
  difficulty: {
    type: String,
    //required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    //required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, //remove whitespaces
    //required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageColor: {
    type: String,
    // required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// model (Thats why we write it 'Tour' not 'tour')
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
