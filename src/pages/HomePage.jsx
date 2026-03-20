import { useEffect, useState } from "react";
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

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const userId = 1; // ชั่วคราวก่อน เดี๋ยวค่อยเปลี่ยนเป็นค่าจาก login

      let cartId;

      try {
        const cartRes = await getActiveCartByUser(userId);
        cartId = cartRes.data.data.id;
      } catch (error) {
        const newCartRes = await createCart(userId);
        cartId = newCartRes.data.data.id;
      }

      await addItemToCart(cartId, product.id, 1);

      alert(`เพิ่ม ${product.name} ลงตะกร้าเรียบร้อยแล้ว`);
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("ไม่สามารถเพิ่มสินค้าเข้าตะกร้าได้");
    }
  };

  return (
    <>
      <Navbar />
      <HeroSection />

      <section className="featured-section py-5">
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