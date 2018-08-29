// const morgan = require('morgan');
// const logger = require('./middleware/logger');
const winston = require('winston')
const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging');
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

// const p = Promise.reject(new Error('Something Failed Miseably'));
// p.then(() => console.log('Done'));


// app.set('view engine', 'pug');
// app.set('views', './views');

//configuration
// console.log(`Application Name: ${config.get('name')}`);
// console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);
// console.log(`app: ${app.get('env')}`);

// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     console.log('Morgan Enabled...');
// }

// app.use(logger);
// app.use(authenticate);


