import createHttpError from 'http-errors'
import { getAllContacts, 
  getContactsById, 
  createContact,
  updateContact,
  deleteContactId } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToCloudinary, saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { UserModel } from '../db/models/user.js';
import env from '../utils/env.js';


export const getContactsController = async (req, res) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const { type, isFavourite } = req.query;

    const filters = { userId: req.user._id };
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
    return res.status(500).json({
      status: 500,
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
};


export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId, req.user._id);

  if (!contact) {
    return res.status(404).json({
       status: 404,
       message: 'Contact not found',
    });
 }

    return res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
  });
};


export const createContactController = async (req, res, next) => {
  try {
    const { file } = req;
    const contactData = { ...req.body, userId: req.user._id };

    if (file) {
      const photoUrl = await saveFileToCloudinary(req.file);
      contactData.photo = photoUrl;
    }

    const contact = await createContact(contactData);

    return res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};


export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;
  const { file } = req;
  const updatedContact = await updateContact(contactId, updateData, req.user._id);

  if (file) {
    const photoUrl = await saveFileToCloudinary(req.file);
    updatedContact.photo = photoUrl;
  }

  if (!updatedContact) {
    throw createHttpError(404, "Contact not found");
  }
  
  return res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
};


export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContactId(contactId, req.user._id);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }
  res.status(204).send();
};


export const patchStudentController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await UserModel(contactId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};