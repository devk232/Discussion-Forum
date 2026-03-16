const express = require('express')
const router = express.Router()
const Post = require('../models/post') // Assuming you have a Post model
const User = require('../models/user') // Assuming you have a User model

// Search route
router.get('/', async (req, res) => {
	try {
		const query = req.query.q
		if (!query) {
			return res.status(400).send('No search query provided')
		}

		// Simple text search on posts and users
		const posts = await Post.find({
			$text: { $search: query },
		})

		const users = await User.find({
			$text: { $search: query },
		})

		// Combine results
		const results = {
			posts,
			users,
		}

		res.send(results)
	} catch (error) {
		console.error('Error during search:', error)
		res.status(500).send('Internal server error')
	}
})

module.exports = router
