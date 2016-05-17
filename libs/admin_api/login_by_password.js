var Promise = require('bluebird')

var admin_security = require(ENDURO_FOLDER + '/libs/admin_utilities/admin_security')
var admin_sessions = require(ENDURO_FOLDER + '/libs/admin_utilities/admin_sessions')

var api_call = function () {}

api_call.prototype.call = function(req, res, query){

	var username = req.query.username
	var password = req.query.password

	admin_security.login_by_password(username, password)
		.then((user) => {
			return admin_sessions.create_session(req, user)
		}, (err) => {
			console.log(err)
			res.send({
				success: false,
			})

		})
		.then((session) => {
			res.send(session)
		})
}

module.exports = new api_call()