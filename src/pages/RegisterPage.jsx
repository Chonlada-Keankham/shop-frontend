import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../api/authApi";

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

      <div className="container" style={{ paddingTop: "120px", minHeight: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4 p-lg-5">
                <h2 className="mb-2 text-center fw-bold">สมัครสมาชิก</h2>
                <p className="text-center text-muted mb-4">
                  สร้างบัญชีเพื่อเริ่มสั่งซื้อสินค้าจาก Cactus House
                </p>

                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label">ชื่อ</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อ"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">อีเมล</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="กรอกอีเมล"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">รหัสผ่าน</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="กรอกรหัสผ่าน"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">เบอร์โทร</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="กรอกเบอร์โทร"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">ที่อยู่</label>
                    <textarea
                      className="form-control form-control-lg"
                      rows="3"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="กรอกที่อยู่"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-success w-100 btn-lg mt-2">
                    สมัครสมาชิก
                  </button>
                </form>

                <p className="text-center mt-4 mb-0">
                  มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
                </p>
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