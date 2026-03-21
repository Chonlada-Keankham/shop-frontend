import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/admin/login");
  };

  return (
    <div className="d-flex min-vh-100">
      <aside
        className="bg-dark text-white p-3"
        style={{ width: "260px", minHeight: "100vh" }}
      >
        <h4 className="mb-4">Admin Dashboard</h4>

        <div className="mb-3">
          <div className="small text-secondary">Signed in as</div>
          <div className="fw-bold">{user?.name || "Admin"}</div>
        </div>

        <nav className="nav flex-column gap-2">
          <Link className="btn btn-outline-light text-start" to="/admin/products">
            จัดการสินค้า
          </Link>
          <Link className="btn btn-outline-light text-start" to="/admin/orders">
            จัดการคำสั่งซื้อ
          </Link>
        </nav>

        <hr className="border-secondary my-4" />

        <button className="btn btn-danger w-100" onClick={handleLogout}>
          ออกจากระบบ
        </button>
      </aside>

      <main className="flex-grow-1 bg-light p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;