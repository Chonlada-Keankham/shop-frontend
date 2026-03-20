import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../api/authApi";

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

      <div className="container" style={{ paddingTop: "120px", minHeight: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4 p-lg-5">
                <h2 className="mb-2 text-center fw-bold">เข้าสู่ระบบ</h2>
                <p className="text-center text-muted mb-4">
                  เข้าสู่ระบบเพื่อเพิ่มสินค้าเข้าตะกร้าและสั่งซื้อ
                </p>

                <form onSubmit={handleLogin}>
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

                  <button type="submit" className="btn btn-success w-100 btn-lg mt-2">
                    เข้าสู่ระบบ
                  </button>
                </form>

                <p className="text-center mt-4 mb-0">
                  ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
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

export default LoginPage;