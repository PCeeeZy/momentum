// Dependencies
const express = require('express');
const routes = require('./routes');
// Express instantation
const app = express();
// Port Variability
const PORT = process.env.PORT || 8080;


// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

// Express Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Server listener
app.listen(PORT, function() {
console.log('Server listening on: http://localhost:' + PORT);
});