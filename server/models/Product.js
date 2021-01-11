const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
  },
  continents: {
    type: String,
  },
  sold: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};
