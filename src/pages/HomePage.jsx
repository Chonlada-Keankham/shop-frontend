import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      const productList = Array.isArray(res.data) ? res.data : res.data.data || [];
      setProducts(productList);
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("โหลดสินค้าไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [products, currentPage]);

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

      // ✅ กัน admin ไม่ให้ใช้ flow ตะกร้า
      if (user.role === "admin") {
        toast.info("บัญชีแอดมินไม่สามารถสั่งซื้อสินค้าได้");
        navigate("/admin/products");
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

      console.log("ADD TO CART DATA:", {
        cartId,
        productId: product.id,
        quantity: 1,
      });

      await addItemToCart(cartId, product.id, 1);
      toast.success(`เพิ่ม ${product.name} ลงตะกร้าเรียบร้อยแล้ว`);
    } catch (error) {
      console.error(
        "Add to cart failed:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "เพิ่มสินค้าลงตะกร้าไม่สำเร็จ"
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
            <>
              <div className="row">
                {currentProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    ก่อนหน้า
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      className={`btn btn-sm ${
                        currentPage === index + 1
                          ? "btn-success"
                          : "btn-outline-success"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    ถัดไป
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <WhyChooseUs />
      <Footer />
    </>
  );
}

export default HomePage;