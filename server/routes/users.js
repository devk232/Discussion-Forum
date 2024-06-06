const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { User, validateUser } = require('../models/user')
const nodemailer = require('nodemailer')
const router = express.Router()
const adminMiddleware = require('../middleware/admin')
const { ObjectId } = mongoose.Types

router.post('/register', async (req, res) => {
	try {
		// Validate user input
		const { error } = validateUser(req.body)
		if (error) return res.status(400).send(error.details[0].message)

		// Check if user already exists
		let user = await User.findOne({ email: req.body.email })
		if (user) return res.status(400).send('User already registered.')

		// Create a new user
		user = new User({
			_id: new ObjectId(), // Generate a new ObjectId for the _id field
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			role: req.body.role,
			cinNumber: req.body.cinNumber,
		})

		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(user.password, salt)
		await user.save()

		// Send registration confirmation email
		await sendRegistrationEmail(user, req.body.role)

		// Respond with the registered user details
		res.send(user)
	} catch (error) {
		console.error('Error registering user:', error)
		res.status(500).send('Internal server error')
	}
})

// Function to send registration confirmation email
async function sendRegistrationEmail(user, selectedRole) {
	const transporter = nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'adam.bensalem@essths.u-sousse.tn', // Office 365 email
			pass: 'WeKueHhCe8', // Office 365 password
		},
		tls: {
			ciphers: 'SSLv3',
		},
	})

	const mailOptions = {
		from: 'adam.bensalem@essths.u-sousse.tn', // sender address
		to: 'adembensalem8@gmail.com', // list of receivers
		subject: 'New User Registration', // Subject line
		html: `
            <h2>Registration Confirmation</h2>
            <p>Hello Admin,</p>
            <p>A new user has registered with the following details:</p>
            <ul>
                <li><strong>Name:</strong> ${user.name}</li>
                <li><strong>Email:</strong> ${user.email}</li>
                <li><strong>Username:</strong> ${user.username}</li>
                <li><strong>Role:</strong> ${selectedRole}</li>
                <li><strong>CIN Number:</strong> ${user.cinNumber}</li>
            </ul>
            <p>Please take necessary action to confirm the user's registration.</p>
            <p>Regards,</p>
            <p>Your Website Team</p>
        `,
	}

	try {
		await transporter.sendMail(mailOptions)
		console.log('Email sent successfully')
	} catch (error) {
		console.error('Error sending email:', error)
	}
}

// PUT endpoint to update user role (Protected route accessible only by admins)
router.put('/:email/role', async (req, res) => {
	// Use adminMiddleware here
	const { email } = req.params
	const { role } = req.body

	try {
		let user = await User.findOne({ email })
		if (!user) {
			return res.status(404).send('User not found')
		}

		if (role !== 'guest') {
			user.status = 'confirmed' // Update status to confirmed if role changed from guest
		}

		user.role = role
		await user.save()

		res.send(user)
	} catch (error) {
		console.error('Error updating user role:', error)
		res.status(500).send('Internal server error')
	}
})

// GET endpoint to get a user by email
router.get('/email/:email', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.params.email }).select(
			'-password',
		)
		if (!user) {
			return res.status(404).send("This user doesn't exist in the database!")
		}

		res.send(user)
	} catch (error) {
		console.error('Error fetching user profile:', error)
		res.status(500).send('Internal server error')
	}
})

router.get('/profile/:userEmail', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.params.userEmail }).select(
			'-password',
		)
		if (!user) {
			return res.status(404).send('user not found')
		}
		res.send(user)
	} catch (e) {
		console.error('error ', e)
		res.status(500).send('server error')
	}
})

// GET endpoint to get current user profile
router.get('/me', async (req, res) => {
	try {
		// Check if user session exists
		if (!req.session.userEmail) {
			return res.status(401).send('Unauthorized ')
		}

		// Fetch user data using session userEmail
		const user = await User.findOne({ email: req.session.userEmail }).select(
			'-password',
		)
		if (!user) {
			return res.status(404).send("This user doesn't exist in the database!")
		}

		res.send(user)
	} catch (error) {
		console.error('Error fetching user profile:', error)
		res.status(500).send('Internal server error')
	}
})

// POST endpoint for user registration

// POST endpoint for user login
router.post('/login', async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).send('Email and password are required')
	}

	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).send('Invalid email or password')
		}

		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return res.status(400).send('Invalid email or password')
		}

		// Set user's session upon successful login
		req.session.userEmail = user.email

		res.send('Login successful')
	} catch (error) {
		console.error('Error logging in user:', error)
		res.status(500).send('Internal server error')
	}
})

// POST endpoint for user logout
router.post('/logout', (req, res) => {
	try {
		// Destroy the user's session upon logout
		req.session.destroy((err) => {
			if (err) {
				console.error('Error destroying session:', err)
				return res.status(500).json({ message: 'Internal server error' })
			}
			res.clearCookie('connect.sid') // Clear session cookie
			res.clearCookie('userEmail') // Clear user email cookie
			res.status(200).json({ message: 'Logged out successfully' })
		})
	} catch (error) {
		console.error('Error logging out:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
})
router.get('/all', async (req, res) => {
	try {
		const users = await User.find().select('-password') // Exclude password field

		res.send(users)
	} catch (error) {
		console.error('Error fetching user list:', error)
		res.status(500).send('Internal server error')
	}
})
router.delete('/:userId', async (req, res) => {
	const { userId } = req.params

	try {
		if (!ObjectId.isValid(userId)) {
			return res.status(400).send('Invalid user ID format')
		}

		const deletedUser = await User.findByIdAndDelete(userId)
		if (!deletedUser) {
			return res.status(404).send('User not found')
		}

		// Handle any post-deletion actions (e.g., removing user data from other collections)
		// ...

		res.send(deletedUser) // Respond with the deleted user object (optional)
	} catch (error) {
		console.error('Error deleting user:', error)
		res.status(500).send('Internal server error')
	}
})

router.put('/:email', async (req, res) => {
	const { email } = req.params
	const updates = req.body // Directly assign req.body to updates

	try {
		// Find the user by email
		let user = await User.findOne({ email })
		console.log('user to edit: ', user)
		console.log('body to edit: ', updates)

		if (!user) {
			return res.status(404).send('User not found')
		}

		// Update fields only if they are provided in the request body
		user.name = updates.name || user.name
		user.email = updates.email || user.email
		user.username = updates.username || user.username
		user.role = updates.role || user.role
		user.cinNumber = updates.cinNumber || user.cinNumber

		await user.save()

		res.send(user) // Respond with the updated user object
	} catch (error) {
		console.error('Error updating user:', error)
		res.status(500).send('Internal server error')
	}
})

// PUT endpoint to update user profile
router.put('/:email', async (req, res) => {
	const { email } = req.params
	const updates = req.body

	try {
		// Find the user by email
		let user = await User.findOne({ email })
		if (!user) {
			return res.status(404).send('User not found')
		}

		// Update fields only if they are provided in the request body
		if (updates.profile_picture) user.profile_picture = updates.profile_picture
		if (updates.bio) user.bio = updates.bio
		if (updates.linkedin) user.linkedin = updates.linkedin
		if (updates.github) user.github = updates.github
		if (updates.twitter) user.twitter = updates.twitter
		if (updates.instagram) user.instagram = updates.instagram
		if (updates.facebook) user.facebook = updates.facebook

		await user.save()

		res.send(user) // Respond with the updated user object
	} catch (error) {
		console.error('Error updating user:', error)
		res.status(500).send('Internal server error')
	}
})

module.exports = router
