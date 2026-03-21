import { Link, useNavigate, Outlet } from "react-router-dom";
import { logout, getUser } from "../utils/auth";

function AdminLayout() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event("authChanged"));
    navigate("/admin/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f6f8f6" }}>
      <aside
        style={{
          width: "260px",
          background: "#355e3b",
          color: "#fff",
          padding: "24px 18px",
        }}
      >
        <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
          Admin Panel
        </h2>
        <p style={{ opacity: 0.9, marginBottom: "24px" }}>
          {user?.name || "Administrator"}
        </p>

        <nav className="d-flex flex-column gap-2">
          <Link className="btn btn-light text-start" to="/admin/products">
            จัดการสินค้า
          </Link>
        </nav>

        <button
          className="btn btn-outline-light mt-4 w-100"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </button>
      </aside>

      <main style={{ flex: 1, padding: "32px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;