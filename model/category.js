const { Schema, model } = require("mongoose");
// const { TransactionsCategory } = require("../config/contants");

const categorySchema = new Schema(
  {
    category: [String],
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: false,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

const Category = model("category", categorySchema);

module.exports = Category;
