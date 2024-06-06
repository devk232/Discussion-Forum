require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const users = require('./routes/users')
const posts = require('./routes/posts')
const tags = require('./routes/tags')
const replies = require('./routes/replies')
const searchRoutes = require('./routes/search')
// MongoDB URL
const mongoDBURL = process.env.mongoDBURL || 'mongodb://localhost:27017/reforum'

// Create a new instance of MongoStore
const mongoStoreInstance = MongoStore.create({
	mongoUrl: mongoDBURL,
	ttl: 180 * 60 * 1000, // session expiration time (3 hours)
})

const app = express()

// Connect to MongoDB
mongoose
	.connect(mongoDBURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Could not connect to MongoDB:', err))

// Enable Mongoose debugging
mongoose.set('debug', true)
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
)

// Session middleware
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'ESSTHSFORUM',
		resave: false,
		saveUninitialized: false,
		store: mongoStoreInstance,
		cookie: { maxAge: 180 * 60 * 1000 }, // 3 hours
	}),
)

// Authentication middleware
const requireLogin = (req, res, next) => {
	console.log(req.session.userEmail)
	if (!req.session.userEmail) {
		return res.status(401).send('Unauthorized')
	}
	next()
}

// Routes
app.get('/', (req, res) => {
	res.send('Request successfully sent!')
})
app.use('/search', searchRoutes)
app.use('/users', users)
app.use('/posts', requireLogin, posts) // Protect posts route, require login
app.use('/tags', requireLogin, tags) // Protect tags route, require login
app.use('/reply', requireLogin, replies) // Protect replies route, require login

// Start the server
const port = process.env.PORT || 4000
app.listen(port, () => {
	console.log(`App running on port ${port}`)
})
