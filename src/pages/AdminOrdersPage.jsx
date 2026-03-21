import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrdersAdmin, updateOrderStatusAdmin } from "../api/orderApi";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getAllOrdersAdmin();
      setOrders(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch admin orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatusAdmin(id, status);
      await fetchOrders();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("อัปเดตสถานะไม่สำเร็จ");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "completed") return "badge bg-success";
    if (status === "cancelled") return "badge bg-danger";
    return "badge bg-warning text-dark";
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">จัดการคำสั่งซื้อ</h2>
          <p className="text-muted mb-0">ดูรายการคำสั่งซื้อและอัปเดตสถานะ</p>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <p className="mb-0">กำลังโหลดคำสั่งซื้อ...</p>
          ) : orders.length === 0 ? (
            <p className="mb-0">ยังไม่มีคำสั่งซื้อในระบบ</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>รหัสคำสั่งซื้อ</th>
                    <th>ชื่อผู้รับ</th>
                    <th>เบอร์โทร</th>
                    <th>ยอดรวม</th>
                    <th>สถานะ</th>
                    <th>เปลี่ยนสถานะ</th>
                    <th>ดูรายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.order_code}</td>
                      <td>{order.customer_name}</td>
                      <td>{order.customer_phone}</td>
                      <td>{order.total} บาท</td>
                      <td>
                        <span className={getStatusBadge(order.status)}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                        >
                          <option value="pending">pending</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                      <td>
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          ดู
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrdersPage;