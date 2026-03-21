import axios from "./axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createCart = (user_id) => {
  return axios.post("/carts", { user_id }, getAuthHeader());
};

export const getActiveCartByUser = (userId) => {
  return axios.get(`/carts/user/${userId}/active`, getAuthHeader());
};

export const addItemToCart = (cart_id, product_id, quantity = 1) => {
  return axios.post(
    "/cart-items",
    { cart_id, product_id, quantity },
    getAuthHeader()
  );
};

export const getCartItemsByCartId = (cartId) => {
  return axios.get(`/cart-items/cart/${cartId}`, getAuthHeader());
};

export const updateCartItemQuantity = (id, quantity) => {
  return axios.put(`/cart-items/${id}`, { quantity }, getAuthHeader());
};

export const deleteCartItem = (id) => {
  return axios.delete(`/cart-items/${id}`, getAuthHeader());
};

export const getCartTotalByCartId = (cartId) => {
  return axios.get(`/cart-items/cart/${cartId}/total`, getAuthHeader());
};

export const updateCartStatus = (cartId, status) => {
  return axios.put(`/carts/${cartId}/status`, { status }, getAuthHeader());
};