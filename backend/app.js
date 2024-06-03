/**
*

Skapad av: Oskar Lindau till Slutprojekt i kursen DT162G
App.js: Denna filen är till för att styra min webbtjänst
Notering: Denna filen är endast något anpassad från standard express till vad jag behöver lägga till

*
**/
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Importerar modulexport från "database.js"
const connectDatabase = require('./database');
// Importerar "seed.js" för att starta applikationen med dokument i "TrainingGoal" och "ScheduledMinutes"
const seed = require('./seed'); 

// Importerar alla routes
const scheduleRoutes = require('./routes/ScheduleRoutes');
const trainingRoutes = require('./routes/TrainingRoutes');
const trainingGoalRoutes = require('./routes/TrainingGoalRoutes');
const scheduledMinutesRoutes = require('./routes/ScheduledMinutesRoutes');

var app = express();

// Middleware för att sätta CORS-headers på alla förfrågningar
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Använder specifika API sökvägar för mina routes
app.use('/api/training', trainingRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/goal', trainingGoalRoutes);
app.use('/api/scheduledMinutes', scheduledMinutesRoutes);

// Kör connectDatabase från "database.js"
connectDatabase();

// Kör seed-funktionen från "seed.js"
// seed();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;