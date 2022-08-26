/*
    TEORÍA:

    Dentro de cada modelo podemos especificar otro método que nos permita fetchear otros objetos.
    Recordemos que user table tiene el channelId que es una fk hacía el id de channel table. 
    
    Es decir, a través de este modelo, no solo podremos fetchear el contenido de la Table User,
    sino también el contenido de otra tabla en conjunto con la de User.

    Dentro de la documentación de Objection.js -> Relations -> Require loops, existe algo llamado "relationMappings".
    Este es el método que necesitaremos.

    En la documentación, por default, tenemos el siguiente método creado:

    static get relationMappings() {
      return {
        pets: {
          relation: Model.HasManyRelation,
          modelClass: Animal,
          join: {
            from: "persons.id",
            to: "animals.ownerId",
          },
        },
      };
    }

    Cada usuario tiene 1 o 0 channels, entonces, no es HasManyRelation, sino: HasOneRelation.
    Dentro del método de la Clase hacemos el require para no tener referencias circulares.
    Entonces, los modelos adicionales necesarios se cargaran en un "lazy" way.

    user.channelId = channel.Id -> JOIN user.channelId ON channel.Id
*/

const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get relationMappings() {
    const Channel = require("./channel");

    return {
      channel: {
        relation: Model.HasOneRelation,
        modelClass: Channel,
        join: {
          from: "user.channelId",
          to: "channel.id",
        },
      },
    };
  }
}

module.exports = User;
