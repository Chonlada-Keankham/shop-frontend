import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrderById, getOrderItemsByOrderId } from "../api/orderApi";

function OrderDetailPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Navbar />

      <div className="container" style={{ paddingTop: "120px", minHeight: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>รายละเอียดคำสั่งซื้อ</h1>
          <Link to="/orders" className="btn btn-outline-secondary">
            กลับไปประวัติคำสั่งซื้อ
          </Link>
        </div>

        {loading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : !order ? (
          <p>ไม่พบคำสั่งซื้อ</p>
        ) : (
          <>
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h4 className="mb-3">ข้อมูลคำสั่งซื้อ</h4>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <strong>รหัสคำสั่งซื้อ:</strong> {order.order_code}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>สถานะ:</strong> {order.status}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>ชื่อผู้รับ:</strong> {order.customer_name}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>เบอร์โทร:</strong> {order.customer_phone}
                  </div>
                  <div className="col-12 mb-2">
                    <strong>ที่อยู่:</strong> {order.customer_address}
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h4 className="mb-3">รายการสินค้า</h4>

                {orderItems.length === 0 ? (
                  <p>ไม่มีรายการสินค้า</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-success">
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

            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="mb-3">สรุปยอด</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span>ยอดรวมสินค้า</span>
                  <span>{order.subtotal} บาท</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>ส่วนลด</span>
                  <span>{order.discount} บาท</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>VAT</span>
                  <span>{order.vat} บาท</span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>ยอดสุทธิ</span>
                  <span>{order.total} บาท</span>
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