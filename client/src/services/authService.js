import http from "./httpService";
import { api } from "../config.js";

export function login(email, password) {
  return http.post(api.usersEndPoint + "login", {
    email: email,
    password: password,
  });
}
