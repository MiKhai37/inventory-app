var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    number_in_stock: { type: Number, required: true },
  }
);

//Virtual for URL (not in the database)
ItemSchema
  .virtual('url')
  .get(function () {
    return '/inventory/item/' + this._id;
  });

// Export the model
module.exports = mongoose.model('Item', ItemSchema);