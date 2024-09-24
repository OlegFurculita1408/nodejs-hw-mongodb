import createHttpError from "http-errors";
import { contactModel } from "../db/models/contacts.js";

export const getAllContacts = async () => {
    const contacts = await contactModel.find();
    return contacts;
};

export const getContactsById = async (contactId) => {
    const contact = await contactModel.findById(contactId);

    if (!contact) {
        throw createHttpError(404, {
            status:404,
            message: `Contact not found ${contactId}`,
            data: null
        })
    }
    return contact;
};

export const createContact = async (payload) => {
    return await contactModel.create(payload);
};

export const updateContact = async (id, updateData) => {
    const updatedContact = await contactModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  
    return updatedContact;
  };

export const deleteContactId = async (id) => {
    const deletedContact = await contactModel.findByIdAndDelete(id);
    return deletedContact;
  };



