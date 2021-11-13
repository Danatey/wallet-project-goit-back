const { Schema, SchemaTypes, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { TransactionsCategory } = require("../config/contants");

const transactionSchema = new Schema(
  {
    value: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      enum: ["+", "-"],
    },
    category: {
      type: String,
      enum: TransactionsCategory,
      default: TransactionsCategory[0],
    },
    date: {
      type: String,
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
    userBalance: {
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
        ret.date = new Date(ret.date);
        ret.year = ret.date.getFullYear();
        ret.month = ret.date.getMonth() + 1;
        delete ret.date;
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// transactionSchema.virtual("transactionBalance").get(function () {
//   if (balance) {
//     return;
//   }
// });

transactionSchema.plugin(mongoosePaginate);
const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
