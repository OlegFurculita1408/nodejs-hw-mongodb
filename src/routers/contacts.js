import { Router } from "express";
import { getContactsController,
     getContactByIdController,
     createContactController,
     deleteContactByIdController,
     updateContactController } from '../controllers/contacts.js'; // Імпорт сервісу
import { ctrlWrapper } from "../utils/ctrlWrapper.js";


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));

export default router;