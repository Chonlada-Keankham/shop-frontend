import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../api/authApi";
import { isLoggedIn, getUser } from "../utils/auth";
import "../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ ถ้าล็อกอินอยู่แล้ว → redirect ตาม role
  useEffect(() => {
    if (isLoggedIn()) {
      const user = getUser();

      if (user?.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("กรอกข้อมูลให้ครบ");
      return;
    }

    try {
      const res = await loginUser(formData);

      const token = res.data.token;
      const user = res.data.user;

      // ✅ เก็บข้อมูล
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // sync navbar
      window.dispatchEvent(new Event("authChanged"));

      // ✅ แยกตาม role
      if (user.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container auth-page">
        <div className="auth-wrapper">
          <div className="row justify-content-center align-items-stretch w-100 g-4">
            <div className="col-lg-5">
              <div className="auth-card h-100">
                <div className="card-body">
                  <span className="auth-brand-badge">Welcome back</span>
                  <h1 className="auth-title">เข้าสู่ระบบ</h1>

                  <p className="auth-subtitle">
                    เข้าสู่ระบบเพื่อใช้งานระบบ
                  </p>

                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label auth-label">อีเมล</label>
                      <input
                        type="email"
                        className="form-control auth-input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="กรอกอีเมล"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label auth-label">รหัสผ่าน</label>
                      <input
                        type="password"
                        className="form-control auth-input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="กรอกรหัสผ่าน"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success w-100 auth-submit-btn mt-2"
                    >
                      เข้าสู่ระบบ
                    </button>
                  </form>

                  <p className="auth-footer-text">
                    ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="auth-side-note h-100">
                <div className="auth-side-note-title">Cactus House</div>

                <p>
                  ระบบร้านค้าออนไลน์ พร้อมระบบหลังบ้านสำหรับผู้ดูแลสินค้า
                </p>

                <ul className="auth-feature-list">
                  <li>ลูกค้า: สั่งซื้อสินค้า</li>
                  <li>แอดมิน: จัดการสินค้า</li>
                  <li>ใช้งานง่าย รองรับทุกอุปกรณ์</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LoginPage;