import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "../api/axios";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.error(error);
      setOrders([]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>ประวัติคำสั่งซื้อ</h2>

        {orders.length === 0 ? (
          <p>ยังไม่มีคำสั่งซื้อ</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.order_code}</td>
                  <td>{o.total}</td>
                  <td>{o.status}</td>
                  <td>
                    <Link to={`/orders/${o.id}`}>ดู</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
}

export default OrderHistoryPage;