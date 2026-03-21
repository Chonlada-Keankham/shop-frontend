import axios from "./axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllProducts = () => {
  return axios.get("/products");
};

export const getProductById = (id) => {
  return axios.get(`/products/${id}`);
};

export const createProduct = (data) => {
  return axios.post("/products", data, getAuthHeader());
};

export const updateProduct = (id, data) => {
  return axios.put(`/products/${id}`, data, getAuthHeader());
};

export const deleteProduct = (id) => {
  return axios.delete(`/products/${id}`, getAuthHeader());
};