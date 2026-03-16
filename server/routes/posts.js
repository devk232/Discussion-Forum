const express = require('express')
const router = express.Router()
const { Post, validatePost } = require('../models/post')
const { Tag } = require('../models/tag')
const { User } = require('../models/user') // Ensure you require the User model
const auth = require('../middleware/auth') // Import the auth middleware

// Get all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find().sort('title') // Sorting by title for consistency
		res.send(posts)
	} catch (error) {
		console.error('Error fetching posts:', error)
		res.status(500).send('Internal server error')
	}
})

// Get a single post by ID
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post) {
			return res.status(404).send('The post with the given ID was not found.')
		}
		res.send(post)
	} catch (error) {
		console.error('Error fetching post:', error)
		res.status(500).send('Internal server error')
	}
})

// Create a new post
router.post('/', auth, async (req, res) => {
	if (!req.session.userEmail) {
		return res.status(401).send('Access denied. No user logged in.')
	}

	const { error } = validatePost(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let tags = []
	if (req.body.tags && req.body.tags.length > 0) {
		tags = await Tag.find({ _id: { $in: req.body.tags.map((tag) => tag._id) } })
		if (tags.length !== req.body.tags.length) {
			return res.status(400).send('Invalid tags.')
		}
	}

	const user = await User.findOne({ email: req.session.userEmail })
	if (!user) {
		return res.status(404).send('User not found!')
	}

	const post = new Post({
		title: req.body.title,
		description: req.body.description,
		tags: req.body.tags || [],
		author: user.username,
	})

	try {
		await post.save()
		res.send(post)
	} catch (err) {
		console.error('Error saving post:', err)
		res.status(500).send('Internal server error')
	}
})

// Update an existing post
router.put('/:id', auth, async (req, res) => {
	const { error } = validatePost(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const tags = await Tag.find({
		_id: { $in: req.body.tags.map((tag) => tag._id) },
	})
	if (tags.length !== req.body.tags.length) {
		return res.status(400).send('Invalid tags.')
	}

	try {
		const post = await Post.findByIdAndUpdate(
			req.params.id,
			{
				title: req.body.title,
				description: req.body.description,
				tags: req.body.tags,
			},
			{ new: true },
		)

		if (!post) {
			return res.status(404).send('The post with the given ID was not found.')
		}
		res.send(post)
	} catch (error) {
		console.error('Error updating post:', error)
		res.status(500).send('Internal server error')
	}
})

// Delete a post
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findByIdAndRemove(req.params.id)
		if (!post) {
			return res.status(404).send('The post with the given ID was not found.')
		}
		res.send(post)
	} catch (error) {
		console.error('Error deleting post:', error)
		res.status(500).send('Internal server error')
	}
})

router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post) {
			return res.status(404).send('Post not found')
		}

		const user = await User.findOne({ email: req.session.userEmail })
		if (!user) return res.status(404).send('User not found!')

		// Check if the user is the author of the post
		if (post.author === user.username) {
			return res.status(400).send("You can't upvote your own post")
		}

		// Check if the user has already upvoted the post
		const index = post.upvotes.indexOf(user._id)
		if (index === -1) {
			// If the user hasn't upvoted, add their ID to the upvotes array
			post.upvotes.push(user._id)
		} else {
			// If the user has already upvoted, remove their ID from the upvotes array
			post.upvotes.splice(index, 1)
		}

		// Save the updated post
		await post.save()

		// Return the updated post
		res.send(post)
	} catch (error) {
		console.error('Error updating post:', error)
		res.status(500).send('Internal server error')
	}
})

module.exports = router
