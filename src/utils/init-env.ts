import path from 'path';

const { NODE_ENV } = process.env;
const envFile = path.resolve(process.cwd(), `.env.${NODE_ENV}`);

require('dotenv').config({ path: envFile });
