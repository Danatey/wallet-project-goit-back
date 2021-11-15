const { Schema, model } = require('mongoose');
// const gravatar = require('gravatar');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;

const userSchema = new Schema(
    {
      name: {
        type: String,
        default: 'User'
      },
      email: {
        type: String,
        required: [true, 'Set email for user'],
        unique: true,
        validate(value) {
          const re = /\S+@\S+.\S+/;
          return re.test(String(value).toLowerCase());
        },
      },
      password: {
          type: String,
          required: [true, 'Set password for user'],
      },

      token: {
          type: String,
          default: null,
      },

      idUserCloud: { type: String, default: null },
      isVerified: { type: Boolean, default: false },
      verifyToken: {
        type: String,
        required: [true, 'Verify token is required'],
        default: crypto.randomUUID()
      },
    },
      {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true, transform: function(doc, ret) {
          delete ret._id;
          return ret;
        }
      },
        toObject: { virtuals: true },
      }
  );
  
  userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(SALT_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });
  
  userSchema.methods.isValidPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = model('user', userSchema);
  
  module.exports = {
    User,
  };