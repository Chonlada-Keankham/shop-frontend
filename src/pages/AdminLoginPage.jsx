import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function AdminLoginPage() {
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
      const user = res.data.user;
      const token = res.data.token;

      if (user.role !== "admin") {
        alert("บัญชีนี้ไม่มีสิทธิ์เข้าใช้งานหลังบ้าน");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("authChanged"));

      navigate("/admin/products");
    } catch (error) {
      console.error("Admin login failed:", error);
      alert("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "480px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="mb-3">Admin Login</h2>
          <p className="text-muted">เข้าสู่ระบบสำหรับผู้ดูแลระบบ</p>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">อีเมล</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">รหัสผ่าน</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-dark w-100">
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;