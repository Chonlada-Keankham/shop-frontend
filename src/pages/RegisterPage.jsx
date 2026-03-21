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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password.length < 6) {
      toast.warning("รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      setSubmitting(true);

      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      });

      toast.success("สมัครสมาชิกสำเร็จ");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
      });

      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "สมัครสมาชิกไม่สำเร็จ");
    } finally {
      setSubmitting(false);
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

                  <form onSubmit={handleRegister} autoComplete="off">
                    <div className="mb-3">
                      <label className="form-label auth-label">ชื่อ</label>
                      <input
                        type="text"
                        className="form-control auth-input"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="กรอกชื่อ"
                        autoComplete="off"
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
                        autoComplete="off"
                        inputMode="email"
                      />
                    </div>

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
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label auth-label">
                        ยืนยันรหัสผ่าน
                      </label>
                      <div className="input-group">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control auth-input"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="กรอกยืนยันรหัสผ่าน"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                      </div>
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
                        autoComplete="off"
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
                        autoComplete="off"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success w-100 auth-submit-btn mt-2"
                      disabled={submitting}
                    >
                      {submitting ? "กำลังสมัคร..." : "สมัครสมาชิก"}
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