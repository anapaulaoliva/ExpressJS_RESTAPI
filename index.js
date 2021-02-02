const express = require('express')
//Express can accept JSO0N(bodyParser) and provide logging(morgan).
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const app = express()

//Process = Provides information about the current Node.js process
//Env property returns an object containing the user environment
//whatever is in the environment variable PORT, or 3000 if there's nothing there.
const PORT = process.env.PORT || 3000
//State of the system environment your application is in when it starts
const NODE_ENV = process.env.NODE_ENV || 'development'
//function used to assign the setting name to value
app.set('port', PORT);
app.set('env', NODE_ENV);
/*Use = method to configure the middleware 
before executing any end route logic or intermediary route logic depending 
upon order of middleware registration sequence used by the routes of the 
Express HTTP server object
Tiny: The minimal output.*/
app.use(logger('tiny'));
//Tells the system that you want json to be used
app.use(bodyParser.json());

app.use('/', require(path.join(__dirname, 'routes/stats')));

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
  });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
    console.log(
      `Express Server started on Port ${app.get(
        'port'
      )} | Environment : ${app.get('env')}`
    );
  });

/*This will create our Express server, listen on port 3000 by default, 
and run in development mode with the environment variable NODE_ENV.*/

/*app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})*/
