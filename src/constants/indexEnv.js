import path from 'node:path';
import env from '../utils/env.js';

export const ENV_VARS = {
    PORT:"PORT",
}
export const MONGODB_DB_VARS = {
    MONGODB_USER:"MONGODB_USER",
    MONGODB_PASSWORD:"MONGODB_PASSWORD",
    MONGODB_URL:"MONGODB_URL",
    MONGODB_DB:"MONGODB_DB",
}
export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
};
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
    CLOUD_NAME: env('CLOUDINARY_CLOUD_NAME'),
    API_KEY: env('CLOUDINARY_API_KEY'),
    API_SECRET: env('CLOUDINARY_API_SECRET'),
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');