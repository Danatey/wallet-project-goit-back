const { Schema, model } = require("mongoose");

const tokenBlackListSchema = new Schema(
  {
    token: {
      type: String,
      default: null,
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

const tokenBlackList = model("token", tokenBlackListSchema);

module.exports = {
  tokenBlackList,
};