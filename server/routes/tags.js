const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { Tag, validateTag } = require('../models/tag')
const _ = require('lodash')
const router = express.Router()

// Get all tags
router.get('/', async (req, res) => {
	const tags = await Tag.find()
	res.send(tags)
})

// Create a new tag
router.post('/', [auth, admin], async (req, res) => {
	const { error } = validateTag(req.body)
	if (error) return res.status(400).send('Enter a valid tag')

	const tag = new Tag({
		name: req.body.name,
	})

	try {
		await tag.save()
		console.log('Tag created')
		res.send(_.pick(tag, ['_id', 'name', 'used']))
	} catch (err) {
		console.log('Error:', err)
		res.status(500).send('Something went wrong.')
	}
})

module.exports = router
