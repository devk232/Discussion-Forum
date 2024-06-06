const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../models/user')

// POST endpoint for user registration
router.post('/register', async (req, res) => {
	try {
		// Validate user input
		const { error } = validateUser(req.body)
		if (error) return res.status(400).send(error.details[0].message)

		// Check if user already exists
		let user = await User.findOne({ email: req.body.email })
		if (user) return res.status(400).send('User already registered.')

		// Create a new user
		user = new User(req.body)
		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(user.password, salt)
		await user.save()

		res.status(200).json({ message: 'User registered successfully' })
	} catch (error) {
		console.error('Error registering user:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

// POST endpoint for user login
router.post('/login', async (req, res) => {
	const { email, password } = req.body

	try {
		// Find the user by email
		const user = await User.findOne({ email })

		// If user not found or password does not match, send error response
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ message: 'Invalid email or password' })
		}

		// Set user's session upon successful login
		req.session.userEmail = user.email

		res.status(200).json({ message: 'Login successful' })
	} catch (error) {
		console.error('Error logging in:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

// POST endpoint for user logout
router.post('/logout', async (req, res) => {
	try {
		// Destroy the user's session upon logout
		req.session.destroy((err) => {
			if (err) {
				console.error('Error destroying session:', err)
				return res.status(500).json({ message: 'Internal server error' })
			}

			res.clearCookie('connect.sid')
			res.clearCookie('userEmail')
			res.status(200).json({ message: 'Logged out successfully' })
		})
	} catch (error) {
		console.error('Error logging out:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

// GET endpoint to get current user profile
router.get('/me', async (req, res) => {
	try {
		// Check if user session exists
		if (!req.session.userEmail) {

			return res.status(401).json({ message: 'Unauthorized' })
		}

		// Fetch the current user's profile
		const user = await User.findOne({ email: req.session.userEmail }).select(
			'-password',
		)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.status(200).json(user)
	} catch (error) {
		console.error('Error fetching user profile:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
})

module.exports = router
