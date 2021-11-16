const { Schema, SchemaTypes, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { TransactionsCategory } = require('../config/constants');

const transactionSchema = new Schema(
  {
    amount: {
      type: String,
      require: true,
      set: (data) => Number(data),
    },
    type: {
      type: String,
      enum: ['+', '-'],
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
      ref: 'user',
    },
    comment: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.amount = Number(ret.amount);
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

transactionSchema.pre('save', function (next) {
  const formatedDate = new Date(this.date);
  this.date = formatedDate;
  this.year = formatedDate.getFullYear();
  this.month = formatedDate.getMonth() + 1;
  this.day = formatedDate.getDay();
  const amountChange = Number(this.amount);
  this.amount = amountChange;

  next();
});
// transactionSchema.virtual("transactionBalance").get(function () {
//   console.log(this.date);

// });

transactionSchema.plugin(mongoosePaginate);
const Transaction = model('transaction', transactionSchema);

module.exports = Transaction;
