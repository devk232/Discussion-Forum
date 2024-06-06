const mongoose = require('mongoose')
const Joi = require('joi')

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 10,
		maxlength: 80,
	},
	tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], // Adjusted tags schema
	description: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	author: {
		type: String, // Changed author type to ObjectId
		ref: 'User',
		required: true,
	},
	views: {
		type: Number,
		default: 1,
		min: 1,
	},
	upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Adjusted upvotes schema
	time: {
		type: Date,
		default: Date.now,
	},
})

const Post = mongoose.model('Post', postSchema)

function validatePost(post) {
	const schema = Joi.object({
		title: Joi.string().required().min(10).max(80),
		description: Joi.string().required().min(5).max(1024), // Changed minimum length for description
		tags: Joi.array().items(Joi.string()), // Adjusted validation for tags
	})
	return schema.validate(post)
}

module.exports.Post = Post
module.exports.validatePost = validatePost
