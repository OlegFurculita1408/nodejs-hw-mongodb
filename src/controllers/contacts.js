import createHttpError from 'http-errors'
import { getAllContacts, 
  getContactsById, 
  createContact,
  updateContact,
  deleteContactId } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';


export const getContactsController = async (req, res) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const { type, isFavourite } = req.query;

    const filters = {};
    if (type) {
      filters.contactType = type;
    }
    if (isFavourite !== undefined) {
      filters.isFavourite = isFavourite === 'true';
    }

    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filters,
  });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
};


export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
  });
};


export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).send({
    status: 201,
		message: "Successfully created a contact!",
		data: contact,
  })
};


export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;
  const updatedContact = await updateContact(contactId, updateData);

  if (!updatedContact) {
    throw createHttpError(404, "Contact not found");
  }
  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
};


export const deleteContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await deleteContactId(contactId);

    if (!contact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  };
};