/*
    TEORÍA:

    Para comunicarnos con la DB vamos a crear un express server.
    La forma de comunicarnos con la DB es cargar alguno de los Models.

    Tenemos un método llamado withGraphFetched al cual le podemos pasar la table adicional que queremos fetchear.

    Comentarios finales: Knex.js es bare bones. Tiene migrations, tiene seed data, y eso está bueno, pero le faltan cosas.
    Objection.js construye sobre Knex.js y la mejora. Objection.js es muy buena dado que nos permite tener los Model Classes.
*/

const setupDb = require("./db/db-setup");
const express = require("express");
const User = require("./db/models/user");

setupDb();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

//En producción, vamos a querer poner esto en separate files.
app.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.query().findById(id).withGraphFetched("channel");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`);
});
