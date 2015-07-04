// Definicion del modelo de Comentario con validaci�n

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Comment',
    { texto: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "Falta Comentario"}}
      }
    }
  );
}