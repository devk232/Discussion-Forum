import http from "./httpService";
import { postEndPoint } from "../config.json";

export function createpost(postbody, user) {
  return http.post(postEndPoint + '/create', {
    title: postbody.title,
    description: postbody.description,
    tags: postbody.tags
  });
}