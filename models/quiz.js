// definicion estructura de la base de datos en sqlite
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
            { pregunta: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "-> Falta Pregunta"}}
              },
              respuesta: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "-> Falta Respuesta"}}
              },
  			tema: {
				type: DataTypes.STRING,
				validate: { 
				  notEmpty: {msg: "Falta tema"},
				  isIn: { 
						args: [['otro', 'humanidades', 'ocio', 'ciencia', 'tecnologia']],
						msg: "Categoría incorrecta"
					    }
			       }
				 }
              }
		  );
}