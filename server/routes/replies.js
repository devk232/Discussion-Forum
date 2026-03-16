const express = require('express')
const auth = require('../middleware/auth')
const { Reply, validateReply } = require('../models/replies')
const { Post } = require('../models/post')
const { User } = require('../models/user')
const router = express.Router()

// Create a new reply
router.post('/create/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post)
			return res.status(404).send("The Post with given ID doesn't exist!")

		const { error } = validateReply(req.body)
		if (error) return res.status(400).send(error.details[0].message)

		const user = await User.findOne({ email: req.session.userEmail })
		if (!user) return res.status(404).send('User not found!')

		const reply = new Reply({
			post: req.params.id,
			comment: req.body.comment,
			author: user._id,
		})
		await reply.save()

		const reply_populated = await Reply.findById(reply._id).populate(
			'author',
			'name -_id',
		)
		res.send(reply_populated)
	} catch (error) {
		console.error('Error creating reply:', error)
		res.status(500).send('Internal server error')
	}
})

// Get replies for a specific post by post ID
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post)
			return res.status(404).send("The post with the given ID doesn't exist.")

		const replies = await Reply.find({ post: req.params.id }).populate(
			'author',
			'name username',
		)
		res.send(replies)
	} catch (error) {
		console.error('Error fetching replies:', error)
		res.status(500).send('Internal server error')
	}
})

// Like or unlike a reply
router.put('/like/:id', auth, async (req, res) => {
	try {
		const reply = await Reply.findById(req.params.id)
		if (!reply) return res.status(400).send("Reply doesn't exist")

		const user = await User.findOne({ email: req.session.userEmail })
		if (!user) return res.status(404).send('User not found!')

		if (reply.author === user.username)
			return res.status(400).send("You can't upvote your own reply")

		const index = reply.upvotes.indexOf(user._id)
		if (index === -1) {
			reply.upvotes.push(user._id)
		} else {
			reply.upvotes.splice(index, 1)
		}
		await reply.save()

		const reply_new = await Reply.findById(reply._id).populate(
			'author',
			'name username',
		)
		res.send(reply_new)
	} catch (error) {
		console.error('Error updating reply:', error)
		res.status(500).send('Internal server error')
	}
})

module.exports = router
