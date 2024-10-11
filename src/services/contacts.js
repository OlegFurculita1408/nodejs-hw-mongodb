import { contactModel } from "../db/models/contacts.js";
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/indexEnv.js';

export const getAllContacts = async ({
        page = 1, 
        perPage = 10,
        sortOrder = SORT_ORDER.ASC,
        sortBy = '_id',
        filters = {},
    }) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;
  
    const contactsQuery = contactModel.find(filters);
    const contactsCount = await contactModel.find(filters)
        .countDocuments()
        .merge(contactsQuery)
        .countDocuments();
  
    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec();
  
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
  
    return {
      data: contacts,
      ...paginationData,
    }
};

export const getContactsById = async (contactId, userId) => {
    const contact = await contactModel.findOne({ _id: contactId, userId });
    return contact;
};

export const createContact = async (payload) => {
    return await contactModel.create(payload);
};

export const updateContact = async (id, updateData, userId) => {
  const updatedContact = await contactModel.findOneAndUpdate(
    { _id: id, userId },
    updateData, 
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedContact;
};

export const deleteContactId = async (id, userId) => {
  const deletedContact = await contactModel.findOneAndDelete({ _id: id, userId });
  return deletedContact;
};