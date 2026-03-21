import api from "./axios";

export const createOrder = async (orderData) => {
  return await api.post("/orders", orderData);
};

export const createOrderItem = async (orderItemData) => {
  return await api.post("/order-items", orderItemData);
};

export const updateOrderStatus = async (orderId, status) => {
  return await api.patch(`/orders/${orderId}/status`, { status });
};

export const getOrdersByUserId = async (userId) => {
  return await api.get(`/orders/user/${userId}`);
};

export const getOrderById = async (orderId) => {
  return await api.get(`/orders/${orderId}`);
};

export const getOrderItemsByOrderId = async (orderId) => {
  return await api.get(`/order-items/order/${orderId}`);
};

export const checkout = () => {
  const token = localStorage.getItem("token");

  return axios.post(
    "/orders/checkout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}; 