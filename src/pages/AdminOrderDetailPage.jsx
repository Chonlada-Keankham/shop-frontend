import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getOrderByIdAdmin,
  getOrderItemsByOrderId,
} from "../api/orderApi";

function AdminOrderDetailPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);

      const orderRes = await getOrderByIdAdmin(orderId);
      setOrder(orderRes.data.data || null);

      const itemsRes = await getOrderItemsByOrderId(orderId);
      setItems(itemsRes.data.data || []);
    } catch (error) {
      console.error("Failed to fetch admin order detail:", error);
      setOrder(null);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">รายละเอียดคำสั่งซื้อ</h2>
          <p className="text-muted mb-0">ตรวจสอบข้อมูลคำสั่งซื้อและรายการสินค้า</p>
        </div>

        <Link to="/admin/orders" className="btn btn-outline-secondary">
          กลับ
        </Link>
      </div>

      {loading ? (
        <p>กำลังโหลด...</p>
      ) : !order ? (
        <p>ไม่พบคำสั่งซื้อ</p>
      ) : (
        <>
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="mb-3">ข้อมูลคำสั่งซื้อ</h5>
              <p className="mb-1"><strong>รหัสคำสั่งซื้อ:</strong> {order.order_code}</p>
              <p className="mb-1"><strong>ชื่อผู้รับ:</strong> {order.customer_name}</p>
              <p className="mb-1"><strong>ที่อยู่:</strong> {order.customer_address}</p>
              <p className="mb-1"><strong>เบอร์โทร:</strong> {order.customer_phone}</p>
              <p className="mb-1"><strong>สถานะ:</strong> {order.status}</p>
              <p className="mb-0"><strong>ยอดรวม:</strong> {order.total} บาท</p>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">รายการสินค้า</h5>

              {items.length === 0 ? (
                <p className="mb-0">ไม่มีรายการสินค้า</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>สินค้า</th>
                        <th>ราคา</th>
                        <th>จำนวน</th>
                        <th>รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.product_name}</td>
                          <td>{item.price} บาท</td>
                          <td>{item.quantity}</td>
                          <td>{item.subtotal} บาท</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminOrderDetailPage;