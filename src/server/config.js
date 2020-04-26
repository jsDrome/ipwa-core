import path from 'path';
import rc from 'rc';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config({ path: path.resolve(process.cwd(), '../.env/.env') });
}

export default rc('config');
