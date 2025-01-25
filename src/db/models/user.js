import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
  },
  { timestamps: true, versionKey: false },
);

// dellite password backand no acces
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = mongoose.model('User', userSchema);