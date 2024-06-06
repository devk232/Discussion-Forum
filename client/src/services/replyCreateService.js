import http from './httpService'
import { api } from '../config.js'
import axios from 'axios'

axios.defaults.withCredentials = true
export function createreply(commentbody, id) {
	return http.post(api.repliesEndPoint + 'create/' + id, commentbody)
}
