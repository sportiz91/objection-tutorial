/*
    TEORÍA:

    Cómo sabe la librería como acceder a la DB? Es por eso que tenemos que armar este setup.
    El db-setup también se encuentra en la documentación de Objection.js -> Getting Started.
    Es decir, lo que tenemos que hacer básicamente es darle la Knex instance creada a Objection library.

    Notar que a la DB le pasamos la configuración de development de knex. 
    El Model.knex(db) quiere decir que instalamos globalmente la db adentro de todos los Modelos.

    Entonces, de esta forma, Objection.js sabe como acceder a la DB.
*/

const knex = require("knex");
const knexfile = require("./knexfile");
const { Model } = require("objection");

const setupDb = () => {
  const db = knex(knexfile.development);
  Model.knex(db);
};

module.exports = setupDb;
