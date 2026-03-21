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

      // ❌ กัน user ธรรมดา
      if (user.role !== "admin") {
        alert("คุณไม่ใช่แอดมิน");
        return;
      }

      // ✅ เก็บข้อมูล
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("authChanged"));

      // ✅ ไปหลังบ้าน
      navigate("/admin/products");
    } catch (error) {
      console.error("Admin login failed:", error.response?.data || error.message);
      alert("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;