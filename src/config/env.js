const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  APP_NAME: process.env.APP_NAME || 'Express API Boilerplate',
  PORT: process.env.PORT || 3000,
  USE_SSL: process.env.USE_SSL || false,
  DB_CONFIG: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    options: {
      dialect: 'mysql',
      define: {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      // eslint-disable-next-line
      logging: ENV === 'development' ? console.log : false,
    },
  },
};
