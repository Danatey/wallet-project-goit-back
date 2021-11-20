const { Schema, SchemaTypes, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const {
  TransactionsCategoryExpance,
  TransactionsCategoryIncome,
} = require("../config/constants");

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      require: true,
      set: (data) => Number(data),
    },
    type: {
      type: String,
      enum: ["+", "-"],
      require: true,
    },
    category: {
      type: String,
      enum: [...TransactionsCategoryIncome, ...TransactionsCategoryExpance],
      default: TransactionsCategoryIncome[0],
    },
    date: {
      type: String,
      require: true,
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
    toObject: {
      virtuals: true,
    },
  }
);

transactionSchema.pre("save", function (next) {
  const formatedDate = new Date(this.date);
  this.year = formatedDate.getFullYear();
  this.month = formatedDate.getMonth() + 1;
  // this.amount = Number(this.amount);

  next();
});

transactionSchema.plugin(mongoosePaginate);
const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
