/* Disabling eslint rules because this code is interacting with DB*/
/* eslint-disable camelcase, quotes */
'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);

const db        = {};

const sequelize = new Sequelize(process.env.DATABASE_URL);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
  .forEach(function(file) {
	const model = sequelize.import(path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/* eslint-enable camelcase, quotes */
