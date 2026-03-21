import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getActiveCartByUser,
  getCartItemsByCartId,
  updateCartItemQuantity,
  deleteCartItem,
  getCartTotalByCartId,
} from "../api/cartApi";
import "../styles/cart.css";
import { getUser, isLoggedIn } from "../utils/auth";

function CartPage() {
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);

      const user = getUser();

      if (!user || !user.id) {
        navigate("/login");
        return;
      }

      const userId = user.id;

      const cartRes = await getActiveCart();
      const activeCartId = cartRes.data.data.id;

      setCartId(activeCartId);

      const itemsRes = await getCartItemsByCartId(activeCartId);
      setCartItems(itemsRes.data.data || []);

      const totalRes = await getCartTotalByCartId(activeCartId);
      setTotalPrice(Number(totalRes.data.data?.total_price || 0));
    } catch (error) {
      if (error.response?.status === 404) {
        setCartItems([]);
        setTotalPrice(0);
        setCartId(null);
      } else {
        console.error("Failed to fetch cart:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (item) => {
    try {
      await updateCartItemQuantity(item.id, item.quantity + 1);
      fetchCartData();
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    try {
      if (item.quantity <= 1) {
        await deleteCartItem(item.id);
      } else {
        await updateCartItemQuantity(item.id, item.quantity - 1);
      }

      fetchCartData();
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      fetchCartData();
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container cart-page">
        <h1 className="cart-title mb-4">ตะกร้าสินค้า</h1>

        {loading ? (
          <p className="text-center">กำลังโหลดตะกร้า...</p>
        ) : !cartId || cartItems.length === 0 ? (
          <div className="text-center empty-cart-box">
            <h4>ยังไม่มีสินค้าในตะกร้า</h4>
            <p>ลองกลับไปเลือกสินค้าเพิ่มได้เลย</p>
            <Link to="/" className="btn btn-success">
              กลับไปเลือกสินค้า
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="table-responsive">
                <table className="table align-middle shadow-sm bg-white">
                  <thead className="table-success">
                    <tr>
                      <th>สินค้า</th>
                      <th>ราคา</th>
                      <th>จำนวน</th>
                      <th>รวม</th>
                      <th>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product_name}</td>
                        <td>{item.price} บาท</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => handleDecrease(item)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => handleIncrease(item)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>{item.subtotal} บาท</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm cart-summary-card">
                <div className="card-body">
                  <h4 className="mb-3">สรุปคำสั่งซื้อ</h4>
                  <div className="d-flex justify-content-between mb-2">
                    <span>จำนวนสินค้า</span>
                    <span>{cartItems.length} รายการ</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>ยอดรวม</span>
                    <span>{totalPrice} บาท</span>
                  </div>

                  <Link to="/checkout" className="btn btn-success w-100 mt-4">
                    ดำเนินการสั่งซื้อ
                  </Link>
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

export default CartPage;