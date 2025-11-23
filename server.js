const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Base build path (works with pkg)
const buildPath = path.join(process.cwd(), 'build');

// Serve static files
app.use(express.static(buildPath));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('File not found: index.html');
  }
});

app.listen(port, () => {
  console.log(`Game running at http://localhost:${port}`);
});
