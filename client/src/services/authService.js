import http from './httpService'
import { api } from '../config.js'

export async function login(email, password) {
	try {
		const response = await http.post(
			api.usersEndPoint + 'login',
			{
				email,
				password,
			},
			{ withCredentials: true },
		)
		return response
	} catch (error) {
		throw error
	}
}

export async function logout() {
	try {
		// Delete the session cookie and userEmail cookie on the client-side
		document.cookie =
			'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
		document.cookie =
			'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

		// Send a request to the server to logout (optional)
		const response = await http.post(
			api.usersEndPoint + 'logout',
			{},
			{ withCredentials: true },
		)

		return response
	} catch (error) {
		throw error
	}
}

export async function getCurrentUser(email) {
	try {
		const response = await http.get(`${api.usersEndPoint}email/${email}`, {
			withCredentials: true,
		})
		return response.data
	} catch (error) {
		throw error
	}
}
