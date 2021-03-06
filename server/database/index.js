const Sequelize = require('sequelize');
const accounts = require('./tables/accounts');
const configurations = require('./tables/configurations');
const configurationHistory = require('./tables/configuration_history');
const settings = require('./tables/settings');

require('dotenv').config();

const sequelize = new Sequelize(
	process.env.GD_DB_NAME,
	process.env.GD_MYSQL_ROOT_USER,
	process.env.GD_MYSQL_ROOT_PASSWORD,
	{
		host: 'db',
		port: process.env.GD_DB_PORT,
		dialect: 'mysql',
		define: {
			freezeTableName: true
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	}
);

const db = {};
[accounts, configurations, configurationHistory, settings].forEach((model) => {
	const seqModel = model(sequelize, Sequelize);
	db[seqModel.name] = seqModel;
});

Object.keys(db).forEach(key => {
	if ('associate' in db[key]) {
		db[key].associate(db);
	}
});

// urgh...
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
