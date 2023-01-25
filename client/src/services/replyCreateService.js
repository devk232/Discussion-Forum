import http from "./httpService";
import { api } from "../config.js";

export function createreply(commentbody, id) {
  return http.post(api.repliesEndPoint + "/create/" + id, {
    comment: commentbody.comment,
  });
}
