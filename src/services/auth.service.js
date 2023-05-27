import axios from "axios";

const API_URL = "http://localhost:3002/auth/";

const register = ( email, password) => {
  return axios.post(API_URL + "createUser", {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "loginUser", {
      email,
      password,
    })
    .then((response) => {
      
      if (response.data.user) {
        
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("currentUser");
  return axios.post(API_URL + "logoutUser").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
