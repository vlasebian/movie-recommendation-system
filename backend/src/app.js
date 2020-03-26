const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// enable cors
app.use(cors());
app.options('*', cors())

// database initialization
const initDatabaseConn = require('./services/database');
initDatabaseConn();

SECRET = 'secret-random-string'

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const votesRouter = require('./routes/votes');
const moviesRouter = require('./routes/movies');

// body parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// express session middleware
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
}));

// overriding http verbs
app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// bind routes
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/votes', votesRouter);
app.use('/api/movies', moviesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({ message: "error"});
});

module.exports = app;
