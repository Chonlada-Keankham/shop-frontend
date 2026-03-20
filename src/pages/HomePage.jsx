import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  getActiveCartByUser,
  createCart,
  addItemToCart,
} from "../api/cartApi";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";
import { getUser, isLoggedIn } from "../utils/auth";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      if (!isLoggedIn()) {
        navigate("/login");
        return;
      }

      const user = getUser();

      if (!user || !user.id) {
        console.error("User data invalid:", user);
        navigate("/login");
        return;
      }

      const userId = user.id;
      let cartId;

      try {
        const cartRes = await getActiveCartByUser(userId);
        cartId = cartRes.data.data.id;
      } catch (error) {
        if (error.response?.status === 404) {
          const newCartRes = await createCart(userId);
          cartId = newCartRes.data.data.id;
        } else {
          throw error;
        }
      }

      await addItemToCart(cartId, product.id, 1);
      console.log(`เพิ่ม ${product.name} ลงตะกร้าเรียบร้อยแล้ว`);
    } catch (error) {
      console.error(
        "Add to cart failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <Navbar />
      <HeroSection />

      <section id="products" className="featured-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">สินค้าทั้งหมด</h2>

          {loading ? (
            <p className="text-center">กำลังโหลดสินค้า...</p>
          ) : products.length === 0 ? (
            <p className="text-center">ยังไม่มีสินค้าในระบบ</p>
          ) : (
            <div className="row">
              {products.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <WhyChooseUs />
      <Footer />
    </>
  );
}

export default HomePage;