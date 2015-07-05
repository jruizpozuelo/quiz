	// Definicion del modelo de Comentario con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment',
			{ texto:{type: DataTypes.STRING,
		  		validate:{ notEmpty:{msg:"-> Falta comentario"}}
				},
			  publicado:{type:DataTypes.BOOLEAN,
				     defaultValue:false}			
			}
		, {
			classMethods: {
			countSinPublicar: function () {
			return this.aggregate('QuizId', 'count', {'where': { 'publicado': false }}).then('success',function(count) {
			return count;
			})
			},
			countQuizesComentadas: function () {
			return this.aggregate('QuizId', 'count', {'distinct': true }).then('success',function(count) {
			return count;
			})
			}
			}
			});
}