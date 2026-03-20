import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrdersByUserId } from "../api/orderApi";
import "../styles/order.css";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrdersByUserId(userId);
      setOrders(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "completed") return "status-badge status-completed";
    if (status === "cancelled") return "status-badge status-cancelled";
    return "status-badge status-pending";
  };

  return (
    <>
      <Navbar />

      <div className="container order-page">
        <div className="order-page-header">
          <div>
            <h1 className="order-page-title">ประวัติคำสั่งซื้อ</h1>
            <p className="order-page-subtitle">
              ตรวจสอบรายการสั่งซื้อย้อนหลังและติดตามสถานะคำสั่งซื้อของคุณ
            </p>
          </div>
        </div>

        {loading ? (
          <div className="empty-order-box">
            <p className="mb-0">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-order-box">
            <h4 className="mb-3">ยังไม่มีคำสั่งซื้อ</h4>
            <p className="text-muted mb-4">
              เมื่อคุณสั่งซื้อสินค้า รายการคำสั่งซื้อจะแสดงที่หน้านี้
            </p>
            <Link to="/" className="btn btn-success">
              กลับไปเลือกสินค้า
            </Link>
          </div>
        ) : (
          <div className="order-card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table order-table align-middle">
                  <thead>
                    <tr>
                      <th>รหัสคำสั่งซื้อ</th>
                      <th>ชื่อผู้รับ</th>
                      <th>เบอร์โทร</th>
                      <th>ยอดรวม</th>
                      <th>สถานะ</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="fw-semibold">{order.order_code}</td>
                        <td>{order.customer_name}</td>
                        <td>{order.customer_phone}</td>
                        <td>{order.total} บาท</td>
                        <td>
                          <span className={getStatusClass(order.status)}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/orders/${order.id}`}
                            className="btn btn-sm btn-outline-success"
                          >
                            ดูรายละเอียด
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default OrderHistoryPage;