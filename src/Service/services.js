import axios from "axios";

const baseUrl = "http://localhost:3001";

let authorization;  // Declare without a type

export const token = () => {
  const accessToken = localStorage.getItem("accessToken");
  authorization = "Bearer " + accessToken;
};

export const login = (data) => {
  const { email, password } = data;
  return axios.post(`${baseUrl}/users/sign-in`, {
    email,
    password,
  });
};

export const registeration = (data) => {
  const { userName, email, password } = data;
  return axios.post(`${baseUrl}/users/sign-up`, {
    name: userName,
    email,
    password,
  });
};

export const uploadFile = (data) => {
  token()
  return axios.post(`${baseUrl}/files/upload`, data, {
    headers: {
      Authorization: authorization,
    }
  });
};

export const getFiles = () => {
  token()
  return axios.get(`${baseUrl}/files/list/details`,{
    headers: {
      Authorization: authorization,
    }
  });
};

export const logout = () => {
  localStorage.removeItem('accessToken')
};
