var path = require('path');

 // postgres DATABASE_url =postgres://user:paswd@host:port/database
 // SQLite DATABASE_URL = sqlite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]|| null);
var user 	= (url[2]|| null);
var pwd		= (url[3]|| null);
var protocol= (url[1]|| null);
var dialect	= (url[1]|| null);
var port	= (url[5]|| null);
var host	= (url[4]|| null);
var storage	= process.env.DATABASE_STORAGE;

// cargar modelo ORM
var Sequelize = require ('sequelize');

// Usar BBDD SQlite o postgres
var sequelize = new Sequelize( DB_name,user,pwd,
		{dialect:protocol,
		 protocol: protocol,
		 port: port,
		 host: host, 
		storage:storage, //solo SQLite (.env)
		omitNull:true    //solo Postgres
		}
		);

// Importar la definicion de la tabla quiz en quiz.js
var quit_path =path.join(__dirname,'quiz');
var Quiz = sequelize.import(quit_path);	
// Importar la definicion de la tabla comment
var comment_path = path.join(__dirname,'Comment');
var Comment = sequelize.import(comment_path);

//cardinalidad
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Exportar definicion de la tabla quiz
exports.Quiz=Quiz;
// Exportar tabla Quiz
exports.Comment = Comment; 


// sequelize.sync() crea e iniciliza tabla de preguntas DB
sequelize.sync().success(function(){
	// sucsess(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count === 0){
		    Quiz.create({ pregunta:'Capital de Italia',
			respuesta:'Roma',tema: 'otro'
				   }); 
			Quiz.create({ pregunta:'Capital de Portugal',
			respuesta:'Lisboa',tema: 'otro'
				   })
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});