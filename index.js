const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const app = express();

const wineRouter = require('./wineRouter');
const userRouter = require('./userRouter');

const PORT = process.env.PORT || 3010;

app.use(bodyParser.json());
app.use(cors());
app.get('/', (_, res) => res.send('Hello World!'));

app.use('/api/user', userRouter);
app.use('/api/wine', wineRouter);

app.listen(PORT, () => console.log(`VINOS backend server | Listening on port ${chalk.blueBright(PORT)}`));
