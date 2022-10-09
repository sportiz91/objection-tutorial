// Update with your config settings.

/*
  en enviornment.connection.database reemplazamos con el string name de nuestra db. 

  Hay varios approaches en el nombre de que podría recibir una db.
  Algunas dbs tienen nombres case sensitive, y algunas otras son case insensitive.
  Generalmente se recomienda usar underscores (_) para nuestra DB. 

  El knexSnakeCaseMappers lo que hace es convertir camelCase convention en underscoore convention_ camel_case.
  Esto es una best practice para dbs. Para dbs generalmente queremos tener underscore convention. 
  Para utilizar este util, lo que deberemos hacerlo es desestructurarlo en el objeto de exportación con la configuración
  Del enviornment.

  El setting que tenemos para development es lo recomendado en la mayoría de los casos. 

  Además de client, connection, pool, migrations y el knexSnakeCaseMappers, podemos especificar una seeds property.
  Seeds -> initial data o directorio donde guardamos los files que crean la initial data. Esto es útil para local development:
  Cuanto más crezca nuestro proyecto, no queremos insertar msanualmente toda la data todo el tiempo. Otro caso: muchas veces
  jugamos un poco con la db y entonces luego queremos dropearla y volver a levantarla con example data. 
  Para todo eso sirve la seeds property.

  Además, recordar que tenemos creado el seeds folder, donde nuestra seed data irá a parar. 
*/

const { knexSnakeCaseMappers } = require("objection");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "objection_tutorial",
      user: "postgres",
      password: "Personald10",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    // seeds: {

    // }
    ...knexSnakeCaseMappers,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
