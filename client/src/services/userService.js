import http from './httpService'
import { api } from '../config.js'

export async function getUserProfile(email) {
	return await http.get(api.usersEndPoint + 'profile/' + email)
}

export async function updateUserProfile(email, userData) {
	return await http.put(api.usersEndPoint + 'profile/' + email, userData)
}

export async function followUser(email) {
	return await http.post(api.usersEndPoint + 'profile/' + email + '/follow')
}

export async function unfollowUser(email) {
	return await http.post(api.usersEndPoint + 'profile/' + email + '/unfollow')
}

export async function register(user) {
	return http.post(
		api.usersEndPoint + 'register',
		{
			name: user.name,
			email: user.email,
			username: user.username,
			password: user.password,
			cinNumber: user.cinNumber, // Corrected field name
		},
		{ withCredentials: true },
	)
}
