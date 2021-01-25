const express = require('express');
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth.router');

const app = express();
const PORT = config.get('port') || 3000;

app.use(bodyParser.json());
app.use('/', authRouter);

async function startApp() {
  try {
    await mongoose.connect(config.get('mongoURL'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(chalk.blue(`Server has been started on port ${PORT}...`)));
  } catch(err) {
    console.log(chalk.red('Server Error: ' + err.message));
    process.exit();    
  }
}

startApp();


