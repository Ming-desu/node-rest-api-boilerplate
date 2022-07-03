const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { DB_CONFIG } = require('../../config/env');

const { database, username, password, options } = DB_CONFIG;

if ([database, username, options.host, options.port].some((x) => !x)) {
  throw new Error(
    `Please setup variables for ${
      process.env.NODE_ENV || 'development'
    } environment.`,
  );
}

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(database, username, password, options);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.' !== 0) && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );

    db[model.name] = model;
  });

Object.keys(db).forEach((name) => {
  if (db[name].associate) {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
