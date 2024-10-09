import { Router } from "express";
import { getContactsController,
     getContactByIdController,
     createContactController,
     deleteContactByIdController,
     updateContactController } from '../controllers/contacts.js';
import { contactSchemaValidation } from '../validation/contactSchemaValid.js';
import { patchtSchemaValidation } from '../validation/patchValidateSchema.js';
import { isValidId } from '../middlewares/isValid.js';
import { validateBody } from '../middlewares/validadeBodyId.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = Router();

router.use(authenticate);

router.get('/',
     ctrlWrapper(getContactsController));

router.get('/contacts',
     ctrlWrapper(getContactsController));

router.use('/contacts/:contactId', 
     isValidId);

router.get('/contacts/:contactId', 
     ctrlWrapper(getContactByIdController));

router.post('/contacts', 
     validateBody(contactSchemaValidation),
     ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', 
     validateBody(patchtSchemaValidation),
     ctrlWrapper(updateContactController));

router.delete('/contacts/:contactId',  
     ctrlWrapper(deleteContactByIdController));

export default router;