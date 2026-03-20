import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../api/authApi";
import "../styles/auth.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      alert("สมัครสมาชิกสำเร็จ");
      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error);
      alert(error.response?.data?.message || "สมัครสมาชิกไม่สำเร็จ");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container auth-page">
        <div className="auth-wrapper">
          <div className="row justify-content-center align-items-stretch w-100 g-4">
            <div className="col-lg-6">
              <div className="auth-card h-100">
                <div className="card-body">
                  <span className="auth-brand-badge">Create account</span>
                  <h1 className="auth-title">สมัครสมาชิก</h1>
                  <p className="auth-subtitle">
                    สร้างบัญชีเพื่อเริ่มสั่งซื้อสินค้า เพิ่มสินค้าเข้าตะกร้า
                    และติดตามคำสั่งซื้อได้อย่างสะดวก
                  </p>

                  <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <label className="form-label auth-label">ชื่อ</label>
                      <input
                        type="text"
                        className="form-control auth-input"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="กรอกชื่อ"
                      />
                    </div>

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

                    <div className="mb-3">
                      <label className="form-label auth-label">เบอร์โทร</label>
                      <input
                        type="text"
                        className="form-control auth-input"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="กรอกเบอร์โทร"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label auth-label">ที่อยู่</label>
                      <textarea
                        className="form-control auth-textarea"
                        rows="3"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="กรอกที่อยู่"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success w-100 auth-submit-btn mt-2"
                    >
                      สมัครสมาชิก
                    </button>
                  </form>

                  <p className="auth-footer-text">
                    มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="auth-side-note h-100">
                <div className="auth-side-note-title">Join the community</div>
                <p>
                  เมื่อสมัครสมาชิกแล้ว คุณจะสามารถสั่งซื้อสินค้าได้ง่ายขึ้น
                  และติดตามสถานะคำสั่งซื้อได้จากบัญชีของคุณ
                </p>

                <ul className="auth-feature-list">
                  <li>จัดเก็บข้อมูลผู้ใช้สำหรับการสั่งซื้อครั้งถัดไป</li>
                  <li>เข้าถึงตะกร้าสินค้าและประวัติคำสั่งซื้อได้สะดวก</li>
                  <li>ใช้งานระบบร้านค้าได้ครบทุกฟังก์ชัน</li>
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

export default RegisterPage;