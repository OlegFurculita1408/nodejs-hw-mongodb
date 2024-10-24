import path from 'node:path';
import fs from 'node:fs/promises';
import env from './env.js';
import cloudinary from 'cloudinary';
import { TEMP_UPLOAD_DIR, 
    UPLOAD_DIR } from '../constants/indexEnv.js';

cloudinary.config({
    secure: true,
    cloud_name: env('CLOUDINARY_CLOUD_NAME'),
    api_key: env('CLOUDINARY_API_KEY'),
    api_secret: env('CLOUDINARY_API_SECRET'),
});
   
export const saveFileToUploadDir = async (file) => {
    const tempPath = path.join(TEMP_UPLOAD_DIR, file.filename);
    const uploadPath = path.join(UPLOAD_DIR, file.filename);

    await fs.rename(tempPath, uploadPath);
    
    return `${env('PORT')}/uploads/${file.filename}`;
};
    
export const saveFileToCloudinary = async (file) => {
    const response = await cloudinary.uploader.upload(file.path, {
        folder: 'contacts',
    });
    
    await fs.unlink(file.path);
    return response.secure_url;
};
    