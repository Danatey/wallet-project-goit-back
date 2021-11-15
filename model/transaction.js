const { Schema, SchemaTypes, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { TransactionsCategory } = require("../config/contants");

const transactionSchema = new Schema(
  {
    emount: {
      type: String,
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
    balance: {
      type: SchemaTypes.ObjectId,
      ref: "user",
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
        ret.emount = Number(ret.emount);
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

transactionSchema.virtual("transactionBalance").get(function () {
  // const res = Transaction.find({}).populate("balance").exec();
  // console.log(res);
});

transactionSchema.plugin(mongoosePaginate);
const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
