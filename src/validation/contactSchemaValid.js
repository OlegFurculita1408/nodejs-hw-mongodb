import Joi from "joi";

export const contactSchemaValidation = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().required().email(),
  phoneNumber: Joi.string().required().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'home', 'work').required(),
});