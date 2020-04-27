import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import config from '../config';
import home from './routes/home';
import login from './routes/login/';
import logout from './routes/logout';

const { ports: { server : PORT } } = config;

// eslint-disable-next-line no-undef
const port = process.env.PORT || PORT;
const app = express();

app.use(cookieParser());
app.use(morgan('tiny'));
app.get('/', home);
app.use('/login', login);
app.use('/logout', logout);
app.use(express.static('.'));

app.listen(port, () => console.log(`SERVER: Listening on port ${port}`));

export default app;
