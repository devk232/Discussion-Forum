import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Create a new axios instance
const http = axios.create({
	withCredentials: true, // Include credentials (cookies) with requests
})

// Add a response interceptor for handling unexpected errors
http.interceptors.response.use(null, (error) => {
	if (
		error &&
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500
	) {
		// Handle expected errors
		toast.error('An unexpected error occurred!')
	} else if (error) {
		// Handle unexpected errors
		toast.error('An unexpected error occurred!')
		console.error('Unexpected error:', error)
	}
	return Promise.reject(error)
})

export default http
