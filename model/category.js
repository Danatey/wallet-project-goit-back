const { Schema, model, SchemaTypes } = require("mongoose");
const { TransactionsCategoryObject } = require("../config/contants");

const categorySchema = new Schema(
  {
    name: { type: String },
    default: { TransactionsCategoryObject },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
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
