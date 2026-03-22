import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getActiveCartByUser,
  getCartItemsByCartId,
  getCartTotalByCartId,
} from "../api/cartApi";
import { checkout } from "../api/orderApi";
import { getUser, isLoggedIn } from "../utils/auth";
import "../styles/checkout.css";

function CheckoutPage() {
  const navigate = useNavigate();

  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_address: "",
    customer_phone: "",
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    fetchCheckoutData();
  }, []);

  const fetchCheckoutData = async () => {
    try {
      setLoading(true);

      const user = getUser();

      if (!user || !user.id) {
        navigate("/login");
        return;
      }

      const cartRes = await getActiveCartByUser(user.id);
      const activeCartId = cartRes.data.data.id;
      setCartId(activeCartId);

      const itemsRes = await getCartItemsByCartId(activeCartId);
      setCartItems(itemsRes.data.data || []);

      const totalRes = await getCartTotalByCartId(activeCartId);
      setTotalPrice(Number(totalRes.data.data?.total_price || 0));

      setFormData({
        customer_name: user.name || "",
        customer_address: user.address || "",
        customer_phone: user.phone || "",
      });
    } catch (error) {
      console.error(
        "Failed to fetch checkout data:",
        error.response?.data || error.message
      );

      toast.error("โหลดข้อมูลตะกร้าไม่สำเร็จ");

      setCartItems([]);
      setTotalPrice(0);
      setCartId(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (
      !formData.customer_name ||
      !formData.customer_address ||
      !formData.customer_phone
    ) {
      toast.warning("กรอกข้อมูลให้ครบ");
      return;
    }

    if (!cartId || cartItems.length === 0) {
      toast.warning("ไม่มีสินค้าในตะกร้า");
      return;
    }

    try {
      await checkout({
        cart_id: cartId,
        customer_name: formData.customer_name,
        customer_address: formData.customer_address,
        customer_phone: formData.customer_phone,
      });

      toast.success("สั่งซื้อสำเร็จ 🎉");
      navigate("/orders");
    } catch (error) {
      console.error("Checkout failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "สั่งซื้อไม่สำเร็จ");
    }
  };
  return (
    <>
      <Navbar />

      <div className="container checkout-page">
        <h1 className="checkout-title mb-4">Checkout</h1>

        {loading ? (
          <p className="text-center">กำลังโหลดข้อมูล...</p>
        ) : cartItems.length === 0 ? (
          <div className="text-center empty-checkout-box">
            <h4>ไม่มีสินค้าในตะกร้า</h4>
            <p>กรุณาเลือกสินค้าก่อนทำรายการสั่งซื้อ</p>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-7 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="mb-4">ข้อมูลผู้รับสินค้า</h4>

                  <form onSubmit={handleCheckout}>
                    <div className="mb-3">
                      <label className="form-label">ชื่อผู้รับ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">ที่อยู่จัดส่ง</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        name="customer_address"
                        value={formData.customer_address}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">เบอร์โทรศัพท์</label>
                      <input
                        type="text"
                        className="form-control"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                      ยืนยันการสั่งซื้อ
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h4 className="mb-4">สรุปรายการสั่งซื้อ</h4>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <div>
                        <div className="fw-bold">{item.product_name}</div>
                        <small>
                          {item.quantity} x {item.price} บาท
                        </small>
                      </div>
                      <div>{item.subtotal} บาท</div>
                    </div>
                  ))}

                  <div className="mt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>ยอดรวมสินค้า</span>
                      <span>{totalPrice.toFixed(2)} บาท</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>VAT 7%</span>
                      <span>{(totalPrice * 0.07).toFixed(2)} บาท</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
                      <span>ยอดสุทธิ</span>
                      <span>
                        {(totalPrice + totalPrice * 0.07).toFixed(2)} บาท
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default CheckoutPage;