import api from "./axios";

export const getActiveCartByUser = async (userId) => {
  return await api.get(`/carts/user/${userId}/active`);
};

export const createCart = async (userId) => {
  return await api.post("/carts", {
    user_id: userId,
  });
};

export const addItemToCart = async (cartId, productId, quantity = 1) => {
  return await api.post("/cart-items", {
    cart_id: cartId,
    product_id: productId,
    quantity,
  });
};

export const getCartItemsByCartId = async (cartId) => {
  return await api.get(`/cart-items/cart/${cartId}`);
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  return await api.put(`/cart-items/${cartItemId}`, {
    quantity,
  });
};

export const deleteCartItem = async (cartItemId) => {
  return await api.delete(`/cart-items/${cartItemId}`);
};

export const getCartTotalByCartId = async (cartId) => {
  return await api.get(`/cart-items/cart/${cartId}/total`);
};

export const updateCartStatus = async (cartId, status) => {
  return await api.put(`/carts/${cartId}/status`, {
    status,
  });
};