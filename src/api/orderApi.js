import axios from "./axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const checkout = (payload = {}) => {
  return axios.post("/orders/checkout", payload, getAuthHeader());
};

export const getMyOrders = () => {
  return axios.get("/orders/my-orders", getAuthHeader());
};

export const getOrderById = (id) => {
  return axios.get(`/orders/${id}`, getAuthHeader());
};

export const getOrderItemsByOrderId = (orderId) => {
  return axios.get(`/order-items/order/${orderId}`, getAuthHeader());
};

export const updateOrderStatus = (id, status) => {
  return axios.patch(`/orders/${id}/status`, { status }, getAuthHeader());
};