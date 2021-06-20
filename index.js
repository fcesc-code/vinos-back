const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const app = express();

const wines = require('./wines');

const PORT = process.env.PORT || 3010;

app.use(bodyParser.json());
app.use(cors());
app.get('/', (_, res) => res.send('Hello World!'));

// app.use('/api/user', require('./user'));
app.use('/api/wine', wines);

app.listen(PORT, () => console.log(`VINOS backend server | Listening on port ${chalk.blueBright(PORT)}`));
