const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

// Serve static files from current directory
app.use(express.static('.'));

// Handle client-side routing - send index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Static server running at http://0.0.0.0:${port}`);
});