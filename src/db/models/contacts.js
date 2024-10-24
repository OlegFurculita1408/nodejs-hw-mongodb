import { model, Schema } from 'mongoose';

const contactSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  isFavourite: { type: Boolean, default: false },
  photo: { type: String },
  contactType: { 
    type: String, 
    enum: ['work', 'home', 'personal'], 
    required: true, 
    default: 'personal' 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false
});

export const contactModel = model('contacts', contactSchema);