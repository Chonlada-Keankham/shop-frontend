import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrdersByUserId } from "../api/orderApi";

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

    return (
        <>
            <Navbar />

            <div className="container" style={{ paddingTop: "120px", minHeight: "100vh" }}>
                <h1 className="mb-4">ประวัติคำสั่งซื้อ</h1>

                {loading ? (
                    <p>กำลังโหลด...</p>
                ) : orders.length === 0 ? (
                    <p>ยังไม่มีคำสั่งซื้อ</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered bg-white">
                            <thead className="table-success">
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
                                        <td>{order.order_code}</td>
                                        <td>{order.customer_name}</td>
                                        <td>{order.customer_phone}</td>
                                        <td>{order.total} บาท</td>
                                        <td>
                                            <span className={`status-badge status-${order.status}`}>
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
                )}
            </div>

            <Footer />
        </>
    );
}

export default OrderHistoryPage;