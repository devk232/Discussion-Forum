const { User } = require('../models/user')

module.exports = async function (req, res, next) {
	try {
		// Check if user session exists
		if (!req.session.userEmail) {

			return res.status(401).send('Unauthorized')
		}

		// Fetch the user from the database using the session userEmail
		const user = await User.findOne({ email: req.session.userEmail })

		// Check if user is an admin
		if (!user || !user.isAdmin) {
			return res.status(403).send('Access Denied')
		}

		// If user is authenticated and is an admin, continue to the next middleware or route handler
		next()
	} catch (error) {
		console.error('Error fetching user:', error)
		return res.status(500).send('Internal Server Error')
	}
}
