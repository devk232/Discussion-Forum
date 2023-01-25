import http from "./httpService";
import  { api } from "../config.js";

export function createpost(postbody, user) {
  return http.post(api.postEndPoint + '/create', {
    title: postbody.title,
    description: postbody.description,
    tags: postbody.tags
  });
}