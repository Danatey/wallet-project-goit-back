const { Schema, SchemaTypes, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const transactionSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Set text for comment"],
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
