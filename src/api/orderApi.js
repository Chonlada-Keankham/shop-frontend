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

// ADMIN
export const getAllOrdersAdmin = () => {
  return axios.get("/orders/admin/all", getAuthHeader());
};

export const getOrderByIdAdmin = (id) => {
  return axios.get(`/orders/admin/${id}`, getAuthHeader());
};

export const updateOrderStatusAdmin = (id, status) => {
  return axios.patch(
    `/orders/admin/${id}/status`,
    { status },
    getAuthHeader()
  );
};