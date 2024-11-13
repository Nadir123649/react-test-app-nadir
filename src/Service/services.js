import axios from "axios";

// const baseUrl = "https://api.sellerscout.com";
const baseUrl = "https://testapi.sellerscout.com";
// const baseUrl = "http://localhost:5278";

let authorization;  // Declare without a type

export const token = () => {
  const accessToken = localStorage.getItem("accessToken");
  authorization = "Bearer " + accessToken;
};

export const login = (data) => {
  const { email, password } = data;
  return axios.post(`${baseUrl}/Account/Login`, {
    email,
    password,
  });
};

export const registeration = (data) => {
  const { userName, email, password } = data;
  return axios.post(`${baseUrl}/Account/Register`, {
    userName,
    email,
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
