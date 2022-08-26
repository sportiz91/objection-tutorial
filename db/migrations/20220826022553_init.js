/*
    TEORÍA:

    Primera migración creada. Objetivo: crear el DB Schema. 

    Tenemos dos métodos: UP y DOWN. UP es para aplicar los cambios y DOWN es para rollback.
    knex.schema.createTable -> creamos la tabla de SQL. createTable recibe el nombre de la tabla como primer argumento
    Y como segundo argumento recibe una cb. Dentro de esa cb podemos especificar las columnas de la Table.
    table.increments() -> nos otorga un id column como integer y hace auto-increment. Además de auto-increments,
    Acá podríamos usar uuids. Pero a los fines de practicidad del tutorial, vamos a usar integers. 
    En producción generalmente vamos a querer tener uuids.
    table.timestamps(true, true) -> lo que hace es crear createdAt y updatedAt columns en la table.

    La creación de foreign key se hace en la siguiente línea:
    table.integer("channelId").references("id").inTable("channel"); Esa fk referencia a la columna id en la table channel.

    La channelId de video también es notNullable, dado que cada video DEBE (must) pertenecer a un channel.

    En la función exports.down lo que hacemos sería el rollback de la table. En este caso simplemente dropear las tablas que creamos.

    Para ejecutar las migraciones, vamos a realizar otro Script: un migrate script.
    Para ejecutar la última migración creada (es decir, hacia el state más actual de la DB), tengo el comando:
    knex migrate:latest. En realidad, este comando corre todas las migraciones. Pero... como podemos ver tenemos timestamps en los files
    de migraciones. Entonces, el comando sabe que migraciones ya se corrieron y no las corre denuevo, obviamente. 

    Luego de correr las migraciones:
    $ npm run migrate

        > objection-tutorial@1.0.0 migrate
        > npx knex migrate:latest --knexfile ./db/knexfile.js

        Working directory changed to ~\Desktop\webdev\objection-tutorial\db
        Using environment: development
        Batch 1 run: 1 migrations

    Dado que corrimos exitosamente las migraciones, deberíamos tener algunas tables en pgAdmin.

    Dentro del Public Schema de la db creada para este tutorial, luego de correr las migraciones, veremos 5 tables:
    channel, user, video, knex_migrations y knex_migrations_lock. 
    knex_migrations es simplemente una table que me muestra información de las migraciones corridas.
    Si le doy click derecho a la table -> view/edit data -> all rows, tirará la siguiente query:
    SELECT * FROM public.knex_migrations ORDER BY id ASC. Notar que en este caso estamos usando el QUALIFIED NAME de postgre sql.
    Es decir, anteponerle antes el public.table -> public.knex_migrations. 

    Luego de haber creado la primera migration que me genera el Public Schema DB, deberemos crear algo de Seed Data. Es decir,
    Al momento la DB está vacía. 

    Dentro de Knex podremos crear un Seed file utilizando el siguiente comando:
    knex seed:make seed_name. 

    Entonces, vamos a crear un nuevo seed script:
    "make-seed": "npx knex seed:make dev --knexfile ./db/knexfile.js"
    Importante -> siempre, después del comando de creación del seed file, irá la route donde está ubicado el knexfile.

    $ npm run make-seed

    > objection-tutorial@1.0.0 make-seed
    > npx knex seed:make dev --knexfile ./db/knexfile.js

    Working directory changed to ~\Desktop\webdev\objection-tutorial\db
    Using environment: development
    Using environment: development
    Using environment: development
    Created seed file: C:\Users\W10\Desktop\webdev\objection-tutorial\db\seeds\dev.js

    Como podemos ver, creamos exitosamente el Seed file.

    El file creado se llama dev.js y podemos ir hacía ese file a seguir con la teoría.
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("channel", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.timestamps(true, true);
    })
    .createTable("user", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.integer("channelId").references("id").inTable("channel");
      table.timestamps(true, true);
    })
    .createTable("video", (table) => {
      table.increments();
      table.string("title").notNullable();
      table
        .integer("channelId")
        .notNullable()
        .references("id")
        .inTable("channel");
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("channel")
    .dropTableIfExists("user")
    .dropTableIfExists("video");
};
