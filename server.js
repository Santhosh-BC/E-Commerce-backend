// server.js
const app = require('./app');
const sequelize = require('./config/db');
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Using Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });