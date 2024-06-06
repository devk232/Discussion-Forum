import http from './httpService'
import { api } from '../config.js'

export function createpost(postbody) {
	console.log('Creating post with body:', postbody) // Debug log
	return http.post(api.postsEndPoint, {
		title: postbody.title,
		description: postbody.description,
		tags: postbody.tags,
	})
}
