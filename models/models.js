var path = require('path');

// cargar modelo ORM
var Sequelize = require ('sequelize');

// Usar BBDD SQlite o postgres
var sequelize = new Sequelize( null,null,null,
		{dialect:"sqlite",storage:"quiz.sqlite"}
		);

// Importar la definicion de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Exportar definicion de la tabla quiz
exports.Quiz=Quiz;

// sequelize.sync() crea e iniciliza tabla de preguntas DB
sequelize.sync().success(function(){
	// sucsess(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count === 0){
			Quiz.create({ pregunta:'Capital de Italia',
			respuesta:'Roma'
				   })
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});