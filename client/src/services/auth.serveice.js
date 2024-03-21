import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
  register(email, username, password) {
    return axios.post(API_URL + "/register", {
      email,
      username,
      password,
    });
  }
  login() {}
  logout() {}
}

export default new AuthService();
