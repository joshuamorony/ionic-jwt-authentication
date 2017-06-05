// Set up
var express     = require('express');
var app         = express();
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var jwt			= require('jsonwebtoken');
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.set('jwtSecret', 'ekjwhf9832j98fh9wefew08');

// Routes
app.post('/api/auth', function(req, res) {

	if(req.body.username === 'Josh' && req.body.password === 'password'){

		var token = jwt.sign({userId: 57}, app.get('jwtSecret'));

		res.json({
			success: true,
			message: 'Authenticated as Admin',
			token: token
		});

	} else {

		res.json({
			success: false,
			message: 'Invalid login'
		});

	}

});

app.post('/api/checkToken', function(req, res) {

	var token = req.body.token;

	if(token){

		jwt.verify(token, app.get('jwtSecret'), function(err, validToken){
		
			if(err){

				res.json({
					success: false,
					message: 'Invalid token'
				})

			} else {

				if(validToken.userId === 57){
					res.json({
						success: true,
						message: 'Authenticated as Admin'
					});
				}

				if(validToken.userId === 1){
					res.json({
						success: true,
						message: 'Authenticated as Super Admin'
					});
				}

			}

		});

	} else {

		res.json({
			success: false,
			message: 'No token provided'
		});		

	}

});
 
// Listen
app.listen(process.env.PORT || 8080);