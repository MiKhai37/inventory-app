var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  }
);

//Virtuel for URL, not in the DB
CategorySchema
  .virtual('url')
  .get(function () {
    return '/inventory/category/' + this._id;
  });

// Export the model
module.exports = mongoose.model('Category', CategorySchema);