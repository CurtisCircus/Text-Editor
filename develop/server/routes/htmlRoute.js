const path = require('path');

module.exports = function (app) {
  // Route to serve the home page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  // Route to serve the editor page
  app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/editor.html'));
  });

  // Route to serve the install page
  app.get('/install', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/install.html'));
  });

  // If none of the routes match, serve the home page as a fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};
