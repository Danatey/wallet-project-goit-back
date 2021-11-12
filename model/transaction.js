const { Schema, SchemaTypes, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { TransactionsCategory } = require("../config/contants");

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      enum: ["add", "substract"],
    },
    category: {
      type: String,
      enum: TransactionsCategory,
      default: TransactionsCategory[0],
    },
    date: {
      type: Number,
    },
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    comment: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

transactionSchema.plugin(mongoosePaginate);
const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
