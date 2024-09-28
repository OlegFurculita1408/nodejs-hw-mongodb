import Joi from "joi";

export const patchtSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
});