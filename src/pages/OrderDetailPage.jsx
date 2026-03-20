import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrderById, getOrderItemsByOrderId } from "../api/orderApi";
import "../styles/order.css";

function OrderDetailPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const storeInfo = {
    name: "Cactus House",
    address: "123 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพมหานคร 10110",
    phone: "02-123-4567",
    email: "cactushouse@example.com",
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);

      const orderRes = await getOrderById(orderId);
      setOrder(orderRes.data.data || null);

      const itemsRes = await getOrderItemsByOrderId(orderId);
      setOrderItems(itemsRes.data.data || []);
    } catch (error) {
      console.error("Failed to fetch order detail:", error);
      setOrder(null);
      setOrderItems([]);
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
            <h1 className="order-page-title">รายละเอียดคำสั่งซื้อ</h1>
            <p className="order-page-subtitle">
              ตรวจสอบข้อมูลคำสั่งซื้อ รายการสินค้า และสรุปยอดชำระเงิน
            </p>
          </div>

          <Link to="/orders" className="btn btn-outline-secondary">
            กลับไปประวัติคำสั่งซื้อ
          </Link>
        </div>

        {loading ? (
          <div className="empty-order-box">
            <p className="mb-0">กำลังโหลดรายละเอียดคำสั่งซื้อ...</p>
          </div>
        ) : !order ? (
          <div className="empty-order-box">
            <h4 className="mb-3">ไม่พบคำสั่งซื้อ</h4>
            <p className="text-muted mb-4">
              รายการที่คุณต้องการดูอาจถูกลบหรือไม่มีอยู่ในระบบ
            </p>
            <Link to="/orders" className="btn btn-success">
              กลับไปหน้าคำสั่งซื้อ
            </Link>
          </div>
        ) : (
          <>
            <div className="order-card mb-4">
              <div className="card-body">
                <div className="order-header-box">
                  <div className="store-info-box">
                    <div className="store-info-title">{storeInfo.name}</div>
                    <div>{storeInfo.address}</div>
                    <div>โทร: {storeInfo.phone}</div>
                    <div>อีเมล: {storeInfo.email}</div>
                  </div>

                  <div className="store-info-box">
                    <div className="store-info-title">Order Summary</div>
                    <div>
                      <span className="order-meta-label">รหัสคำสั่งซื้อ: </span>
                      <span className="order-meta-value">{order.order_code}</span>
                    </div>
                    <div className="mt-2">
                      <span className="order-meta-label">สถานะ: </span>
                      <span className={getStatusClass(order.status)}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-card mb-4">
              <div className="card-body">
                <h3 className="order-section-title">ข้อมูลผู้รับสินค้า</h3>

                <div className="order-detail-grid">
                  <div>
                    <div className="order-meta-label">ชื่อผู้รับ</div>
                    <div className="order-meta-value">{order.customer_name}</div>
                  </div>

                  <div>
                    <div className="order-meta-label">เบอร์โทร</div>
                    <div className="order-meta-value">{order.customer_phone}</div>
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <div className="order-meta-label">ที่อยู่จัดส่ง</div>
                    <div className="order-meta-value">{order.customer_address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-card mb-4">
              <div className="card-body">
                <h3 className="order-section-title">รายการสินค้า</h3>

                {orderItems.length === 0 ? (
                  <p className="mb-0">ไม่มีรายการสินค้า</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table order-table align-middle">
                      <thead>
                        <tr>
                          <th>สินค้า</th>
                          <th>ราคา</th>
                          <th>จำนวน</th>
                          <th>รวม</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((item) => (
                          <tr key={item.id}>
                            <td className="fw-semibold">{item.product_name}</td>
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

            <div className="order-card">
              <div className="card-body">
                <h3 className="order-section-title">สรุปยอด</h3>

                <div className="order-summary-box">
                  <div className="order-summary-row">
                    <span>ยอดรวมสินค้า</span>
                    <span>{order.subtotal} บาท</span>
                  </div>
                  <div className="order-summary-row">
                    <span>ส่วนลด</span>
                    <span>{order.discount} บาท</span>
                  </div>
                  <div className="order-summary-row">
                    <span>VAT</span>
                    <span>{order.vat} บาท</span>
                  </div>
                  <div className="order-summary-row total">
                    <span>ยอดสุทธิ</span>
                    <span>{order.total} บาท</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default OrderDetailPage;