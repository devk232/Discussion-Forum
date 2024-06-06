import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './components/dashboard'
import Jumbotron from './components/common/jumbotron'
import NotFound from './components/not-found'
import NewPost from './components/createpost'
import Log from './components/log'
import Logout from './components/logout' // Import Logout component
import SearchResult from './components/SearchResult'
import Register from './components/register'
import NavBar from './components/navbar'
import ProtectedRoute from './components/common/protectedRoute'
import PostPage from './components/PostPage'
import EditPost from './components/EditPost'
import AdminPage from './components/AdminPage'
import { getCurrentUser, logout } from './services/authService'
import Profile from './components/Profile'
class App extends Component {
	state = {
		user: null,
	}

	async componentDidMount() {
		const email = this.getCookie('userEmail')
		if (email) {
			try {
				const user = await getCurrentUser(email)
				this.setState({ user })
			} catch (error) {
				console.error('Error fetching current user:', error)
			}
		}
	}

	getCookie(name) {
		const value = `; ${document.cookie}`
		const parts = value.split(`; ${name}=`)
		if (parts.length === 2) return parts.pop().split(';').shift()
		return null
	}

	handleLogout = async () => {
		try {
			await logout()
			this.setState({ user: null }) // Clear user state after logout
		} catch (error) {
			console.error('Error logging out:', error)
		}
	}

	render() {
		const { user } = this.state

		return (
			<div>
				<NavBar user={user} onLogout={this.handleLogout} />{' '}
				{/* Pass onLogout prop */}
				<Switch>
					<Route
						path='/users/login'
						render={(props) =>
							user ? <Redirect to='/dashboard' /> : <Log {...props} />
						}
					/>
					<Route
						path='/users/register'
						render={(props) =>
							user ? <Redirect to='/users/login' /> : <Register {...props} />
						}
					/>
					<Route path='/users/logout' component={Logout} />{' '}
					<Route path='/profile' component={Profile} />
					<ProtectedRoute path='/dashboard' component={Dashboard} user={user} />
					<Route path='/not-found' component={NotFound} />
					<ProtectedRoute path='/new-post' component={NewPost} user={user} />
					<ProtectedRoute
						path='/edit-post/:id'
						component={EditPost}
						user={user}
					/>
					<Route
						path='/post/:id'
						render={(props) => <PostPage {...props} user={user} />}
					/>
					<ProtectedRoute path='/admin' component={AdminPage} user={user} />
					<Route path='/search' component={SearchResult} />
					<Route exact path='/' component={Jumbotron} />
					<Redirect from='/users' to='/users/login' />
					<Redirect to='/not-found' />
				</Switch>
			</div>
		)
	}
}

export default App
