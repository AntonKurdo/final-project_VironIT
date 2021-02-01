const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth.router');
const postRouter = require('./routers/posts.router');
const friendsRouter = require('./routers/friends.router');
const commentsRouter = require('./routers/comments.router');

const PORT = process.env.PORT || config.get('port');

app.use(bodyParser.json());
app.use('/', authRouter);
app.use('/posts', postRouter);
app.use('/friends', friendsRouter);
app.use('/comments', commentsRouter);

async function startApp() {
  try {
    await mongoose.connect(config.get('mongoURL'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });  
    
    io.on("connection", (socket: any) => {
      console.log("a user connected :D");
      socket.on("chat message", (msg: string) => {
        console.log(msg);
        io.emit("chat message", msg);
      });
    });

    http.listen(PORT, () => console.log(chalk.blue(`Server has been started on port ${PORT}...`)));

  
  } catch(err) {
    console.log(chalk.blue('Server Error: ' + err.message));
    process.exit();    
  }
}

startApp();


