var express = require('express');
var session = require('express-session');
var cors = require('cors');
var app = express();

var path = require('path');
var logger = require('morgan');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');

// database initialization
var db = require('./services/database');

// session authentication
require('./services/passport')(db);

// enable cors
app.options('*', cors()) // include before other routes
app.use(cors());

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users')(db);
var votesRouter = require('./routes/votes')(db);
var moviesRouter = require('./routes/movies')(db);

// body parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// express session middleware, must be before passport.session()!
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

// used for overriding http verbs
app.use(methodOverride('_method'));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// bind routes
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/votes', passport.authenticate('jwt', { session: false }), votesRouter);
app.use('/api/movies', passport.authenticate('jwt', { session: false }), moviesRouter);
//app.use('/api/movies', moviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: 'error-not-found',
    });
});

module.exports = app;