import http from "./httpService";
import { repliesEndPoint } from "../config.json";

export function createreply(commentbody, id) {
  return http.post(repliesEndPoint + "/create/" + id, {
    comment: commentbody.comment,
  });
}
