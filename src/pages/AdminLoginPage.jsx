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

      if (!user || user.role !== "admin") {
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("authChanged"));

      navigate("/admin/products");
    } catch (error) {
      console.error("Admin login failed:", error);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f6f8f6" }}
    >
      <div className="card shadow border-0 rounded-4" style={{ width: "420px" }}>
        <div className="card-body p-4">
          <h2 className="mb-2 text-center fw-bold">Admin Login</h2>
          <p className="text-center text-muted mb-4">
            เข้าสู่ระบบสำหรับผู้ดูแลระบบ
          </p>

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

            <div className="mb-3">
              <label className="form-label">รหัสผ่าน</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success w-100" type="submit">
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;