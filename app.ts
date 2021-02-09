const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const socketStart = require('./services/socket.service');

//Routers
const authRouter = require('./routers/auth.router');
const postRouter = require('./routers/posts.router');
const friendsRouter = require('./routers/friends.router');
const commentsRouter = require('./routers/comments.router');
const profileRouter = require('./routers/profile.router');
const groupChatsRouter = require('./routers/groupChats.router');
const personalChatsRouter = require('./routers/personalChats.router');
const archivedChatsRouter = require('./routers/archivedChats.router');

const PORT = process.env.PORT || config.get('port');

app.use(bodyParser.json());

//ROUTERS 
app.use('/', authRouter);
app.use('/posts', postRouter);
app.use('/profile', profileRouter)
app.use('/friends', friendsRouter);
app.use('/comments', commentsRouter);
app.use('/groupChats', groupChatsRouter);
app.use('/personalChats', personalChatsRouter);
app.use('/archivedChats', archivedChatsRouter);

(async function startApp() {
  try {
    await mongoose.connect(config.get('mongoURL'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });   
    await socketStart(io);
    http.listen(PORT, () => console.log(chalk.blue(`Server has been started on port ${PORT}...`)));  
  } catch(err) {
    console.log(chalk.blue('Server Error: ' + err.message));
    process.exit();    
  }
})();


