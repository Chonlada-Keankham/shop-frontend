import axios from "./axios";

export const checkout = (payload = {}) => {
  return axios.post("/orders/checkout", payload);
};

export const getMyOrders = () => {
  return axios.get("/orders/my-orders");
};

export const getOrderById = (id) => {
  return axios.get(`/orders/${id}`);
};

export const getOrderItemsByOrderId = (orderId) => {
  return axios.get(`/order-items/order/${orderId}`);
};

// ADMIN
export const getAllOrdersAdmin = () => {
  return axios.get("/orders/admin/all");
};

export const getOrderByIdAdmin = (id) => {
  return axios.get(`/orders/${id}`);
};

export const updateOrderStatusAdmin = (id, status) => {
  return axios.patch(`/orders/admin/${id}/status`, { status });
};