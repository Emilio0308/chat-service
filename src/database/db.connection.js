// const { Sequelize } = require('sequelize');

// const db = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DATABASE_HOST,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_DB,
//   port:process.env.DATABASE_PORT,
//   logging: false,
// });

// module.exports = { db };

const mongoose = require('mongoose');

const MONGO_URI = process.env.DATABASE_URL2;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

module.exports = { db };
