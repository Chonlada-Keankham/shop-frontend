import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../api/authApi";
import "../styles/auth.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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

    if (!formData.name || !formData.email || !formData.password) {
      toast.warning("กรอกข้อมูลให้ครบ");
      return;
    }

    try {
      await registerUser(formData);

      toast.success("สมัครสมาชิกสำเร็จ 🎉");

      // ✅ reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });

      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error);

      toast.error(
        error.response?.data?.message || "สมัครสมาชิกไม่สำเร็จ"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container auth-page">
        <div className="auth-wrapper">
          <div className="row justify-content-center align-items-stretch w-100 g-4">
            
            {/* FORM */}
            <div className="col-lg-6">
              <div className="auth-card h-100">
                <div className="card-body">
                  <span className="auth-brand-badge">Create account</span>
                  <h1 className="auth-title">สมัครสมาชิก</h1>

                  <form onSubmit={handleRegister}>
                    
                    {/* NAME */}
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

                    {/* EMAIL */}
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

                    {/* PASSWORD + EYE */}
                    <div className="mb-3">
                      <label className="form-label auth-label">รหัสผ่าน</label>

                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control auth-input"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="กรอกรหัสผ่าน"
                        />

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "🙈" : "👁"}
                        </button>
                      </div>
                    </div>

                    {/* PHONE */}
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

                    {/* ADDRESS */}
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

                  <p className="auth-footer-text mt-3">
                    มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
                  </p>
                </div>
              </div>
            </div>

            {/* SIDE */}
            <div className="col-lg-4">
              <div className="auth-side-note h-100">
                <div className="auth-side-note-title">
                  Join the community
                </div>
                <p>
                  สมัครแล้วสามารถสั่งซื้อสินค้า และติดตามคำสั่งซื้อได้ทันที
                </p>

                <ul className="auth-feature-list">
                  <li>บันทึกข้อมูลผู้ใช้</li>
                  <li>ดูประวัติคำสั่งซื้อ</li>
                  <li>ใช้งานระบบได้ครบ</li>
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