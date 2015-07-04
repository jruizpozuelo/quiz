var users={admin : {id:1, username :'admin', password:'1234' }, 
	   pepe : {id: 2, username : 'pepe', password: '5678' }} 

// ComprueBba si el usuario esta registrado en users
// Si la autentificación fall o hay errores se ejecuta callback(error)


exports.autenticar = function (login, password, callback) {
console.log('ENTRO en autenticar');
    if (users[login]) {
	console.log('existe usuario');
        if (password === users[login].password) {
		console.log('ok');
            callback(null, users[login]);
        }else {
		console.log('mal');
            callback(new Error('Password incorrecto'));
   	}
    }else {
        callback(new Error('No existe el usuario'));
    }
};