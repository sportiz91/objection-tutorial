/*
    TEORÍA:

    Lo siguiente que vamos a tener que hacer, para cada modelo, es Wire Up nuestra Knex instance con la DB.
    El setup lo vamos a estar armando en db-setup.js.

    Nos movemos a dicho file.
*/

const { Model } = require("objection");

class Channel extends Model {
  static get tableName() {
    return "channel";
  }
}

module.exports = Channel;
