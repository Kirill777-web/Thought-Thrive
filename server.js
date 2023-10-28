// Import the express package
const express = require('express');
const app = express();

// Import the express-session package for session management
const session = require('express-session');
// Import the express-handlebars package for view rendering
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Import the path package to work with file and directory paths
const path = require('path');
// Define the routes by importing from the controllers directory
const routes = require('./controllers');
// Connect to the database using Sequelize
const sequelize = require('./config/connection');
// Helps store session data on the client side using Sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Setup the port on which the server will listen
const PORT = process.env.PORT || 3001;

// Session configuration object
const sess = {
  // Secret key used to sign the session ID cookie
  secret: '7537',
  // Cookie settings
  cookie: {
    maxAge: 300000, // Maximum age of the cookie
    httpOnly: true, // Prevents client-side access to the cookie
    secure: false, // Should be true in production if using HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Store session data using Sequelize
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Apply session middleware to the application
app.use(session(sess));

// Set up Handlebars.js engine with custom helpers and set it as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Apply middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define and use routes from the controllers directory
app.use(routes);

// Synchronize the Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App is listening at http://localhost:${PORT}!`)
  );
});
