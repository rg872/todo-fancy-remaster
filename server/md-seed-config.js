require('dotenv').config()
const mongooseLib = require('mongoose')
const { EnemySeeder } = require('./seeders/enemy.seeder')

mongooseLib.Promise = global.Promise || Promise

module.exports = {

  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: `mongodb://${process.env.DB_USER}:${process.env.DB_USER_PASS}@ds229790.mlab.com:29790/todo-fancy`,

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    EnemySeeder
  }
}
