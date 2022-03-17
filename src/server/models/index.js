const dbConfig = require("../configs/db.config");

const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = [
  require("../models/members"),
  require("../models/memberPayments"),
].map(m=> m(sequelize,Sequelize));

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.slaia = (sequelize, Sequelize);
console.log(db);
sequelize.sync();

module.exports = sequelize;