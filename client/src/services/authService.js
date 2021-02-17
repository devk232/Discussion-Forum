import http from "./httpService";
import { usersEndPoint } from "../config.json";

export function login(email, password) {
  return http.post(usersEndPoint + "/login", {
    email: email,
    password: password,
  });
}
