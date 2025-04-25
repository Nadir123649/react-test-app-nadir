import axios from "axios";

const baseUrl = "http://localhost:5000";

let authorization;  // Declare without a type

export const token = () => {
  const accessToken = localStorage.getItem("accessToken");
  authorization = "Bearer " + accessToken;
};

export const login = (data) => {
  const { email, password } = data; 
  return axios.post(`${baseUrl}/api/auth/login`, {
    email,
    password,
  });
};

export const registeration = (data) => {
  const { username, email, password, role } = data;
  return axios.post(`${baseUrl}/api/user/signup`, {
    username,
    email,
    role,
    password,
  });
};

export const logout = () => {
  return axios.post(`${baseUrl}/Account/Logout`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
