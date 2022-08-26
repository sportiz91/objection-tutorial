/*
  TEORÍA:

  Antes de cualquier código dentro de la función seed, vamos a tener que hacer un truncate de todas las tables existentes.
  Si no hacemos el truncado de todas las tables existentes, las estaríamos agregando dos veces.
  La manera de hacer esto en postgres es a través de runnear un Raw Statement. 
  Y tendremos que correr el RAW Statement dado que hay fk en nuestra Table. 
  Es decir, no podemos hacer knex.truncate -> esto dado que la DB nos tirará un error alertándonos que hay fk constraints.

  La forma de ingresar rows en la DB es a través de knex("tableName").insert([{}, {}]), donde cada key será la columna y el value será el valor
  De la Table.

  Luego de ingresar toda la Seed Data, debemos hacer otro Script para runear los seed files:
  knex seed run

  Por último, podríamos agregar un script para realizar el DOWN de la migración.
  Esto dado que, si nos equivocamos y hacemos algo mal con nuestra DB, querremos deshacer la current migration

  Una vez que tenemos la primera migración con la creación de las tablas y la seed data, lo último que resta hacer es crear nuestros models classes.
  Para esto, podemos chequear la sección Models de Objection.js docs. Básicamente:
  Creamos una Class, la Class contiene una serie de propiedades y luego podremos directamente interactuar con la Class y no necesitamos ir tan Low Level.

  Nos movemos entonces al file channel.js
*/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Truncate all existing tables:
  await knex.raw('TRUNCATE TABLE "channel" CASCADE');
  await knex.raw('TRUNCATE TABLE "user" CASCADE');
  await knex.raw('TRUNCATE TABLE "video" CASCADE');

  await knex("channel").insert([
    {
      id: 1,
      name: "channel1",
    },
    {
      id: 2,
      name: "channel2",
    },
    {
      id: 3,
      name: "channel3",
    },
  ]);

  await knex("user").insert([
    {
      id: 1,
      name: "user1",
      email: "user1@test.com",
      channelId: 1,
    },
    {
      id: 2,
      name: "user2",
      email: "user2@test.com",
      channelId: 2,
    },
    {
      id: 3,
      name: "user3",
      email: "user3@test.com",
      channelId: 3,
    },
  ]);

  //Podemos hacer return en el último ingreso de data a una Table.
  return await knex("video").insert([
    {
      id: 1,
      title: "Video 1 By User 1",
      channelId: 1,
    },
    {
      id: 2,
      title: "Video 2 By User 1",
      channelId: 1,
    },
    {
      id: 3,
      title: "Video 3 By User 2",
      channelId: 2,
    },
  ]);
};
