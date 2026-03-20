import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../api/authApi";
import "../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("เข้าสู่ระบบสำเร็จ");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
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
                    เข้าสู่ระบบเพื่อเพิ่มสินค้าเข้าตะกร้า ตรวจสอบคำสั่งซื้อ
                    และใช้งาน Cactus House ได้อย่างเต็มรูปแบบ
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
                  ร้านขายแคคตัสและไม้อวบน้ำออนไลน์ที่ออกแบบมาให้เรียบง่าย
                  ใช้งานสะดวก และช่วยให้ลูกค้าสั่งซื้อสินค้าได้อย่างรวดเร็ว
                </p>

                <ul className="auth-feature-list">
                  <li>เพิ่มสินค้าเข้าตะกร้าได้ทันทีหลังเข้าสู่ระบบ</li>
                  <li>ตรวจสอบประวัติคำสั่งซื้อย้อนหลังได้</li>
                  <li>ดูรายละเอียดคำสั่งซื้อและยอดชำระได้ครบถ้วน</li>
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