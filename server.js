const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const objectRoutes = require('./routes/objectRoutes');
const userRoutes = require('./routes/routes'); // Ensure this path is correct
const departementRoutes = require('./routes/departementRoutes');
const directorRoutes = require('./routes/directorRoutes');
const posteRoutes = require('./routes/posteRoutes');
const roleRoutes = require('./routes/roleRoutes');
const requestRoutes = require('./routes/requestRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const dataApprovalRoutes = require('./routes/dataApprovalRoutes');
const userRequestVali=require('./routes/userrequesrtroute');
const app = express();
const port = process.env.PORT || 8000;

mongoose.set('debug', true); // Enable debug mode for Mongoose

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', objectRoutes);
app.use('/', userRoutes);
app.use('/', departementRoutes);
app.use('/', directorRoutes);
app.use('/', posteRoutes);
app.use('/', roleRoutes);
app.use('/', requestRoutes);
app.use('/', workflowRoutes);
app.use('/', dataApprovalRoutes);
app.use('/', userRequestVali);
// Error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// MongoDB Connection
mongoose.connect('mongodb+srv://eyakhadhroui:GZG8e4djVqkq6LkH@cluster0.dtkp5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  serverSelectionTimeoutMS: 30000 // 30 seconds
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
