import dotenv from 'dotenv';
import path from 'path';

const env = dotenv.config({
  path: path.resolve(path.dirname(''), '.env'),
});

dotenv.config({
  path: path.resolve(
    path.dirname(''),
    `.env${
      process.env.NODE_ENV !== 'production' ? `.${process.env.NODE_ENV}` : ''
    }`,
  ),
});

export default env;
