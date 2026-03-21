import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.username === "admin" && form.password === "1234") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin/products");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;