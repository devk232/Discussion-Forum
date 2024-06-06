const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	role: {
		type: String,
		enum: ['admin', 'professeur', 'ex-etudiant', 'etudiant', 'guest'],
		default: 'guest',
	},
	status: {
		type: String,
		enum: ['unconfirmed', 'confirmed'],
		default: 'unconfirmed',
	},
	cinNumber: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 8,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
})

const User = mongoose.model('User', userSchema)

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().email().min(5).max(255).required(),
		username: Joi.string().min(3).max(50).required(),
		password: Joi.string().min(5).max(255).required(),
		role: Joi.string().valid(
			'admin',
			'professeur',
			'ex-etudiant',
			'etudiant',
			'guest',
		),
		cinNumber: Joi.string()
			.pattern(/^\d{8}$/)
			.required(),
	})
	return schema.validate(user)
}

exports.User = User
exports.validateUser = validateUser
