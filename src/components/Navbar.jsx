import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { isLoggedIn, logout, getUser } from "../utils/auth";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [user, setUser] = useState(getUser());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const syncAuthState = () => {
      setLoggedIn(isLoggedIn());
      setUser(getUser());
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("authChanged", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("authChanged", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const isAdmin = user?.role === "admin";

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setLoggedIn(false);
    setUser(null);
    setShowLogoutModal(false);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/", { replace: true });
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg cactus-navbar fixed-top ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="container">
          <Link
            className="navbar-brand brand-logo"
            to={isAdmin ? "/admin/products" : "/"}
          >
            <span className="brand-icon">🌵</span>
            <span className="brand-text">Cactus House</span>
          </Link>

          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>☰</span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              {loggedIn && !isAdmin && (
                <>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link btn btn-link nav-btn-link"
                      onClick={() => navigate("/cart")}
                    >
                      🛒 ตะกร้า
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link btn btn-link nav-btn-link"
                      onClick={() => navigate("/orders")}
                    >
                      คำสั่งซื้อ
                    </button>
                  </li>
                </>
              )}

              {loggedIn && isAdmin && (
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link btn btn-link nav-btn-link"
                    onClick={() => navigate("/admin/products")}
                  >
                    หลังบ้าน
                  </button>
                </li>
              )}

              {!loggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/login" ? "active-nav" : ""
                      }`}
                      to="/login"
                    >
                      เข้าสู่ระบบ
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="btn btn-light btn-sm nav-register-btn"
                      to="/register"
                    >
                      สมัครสมาชิก
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogoutClick}
                  >
                    ออกจากระบบ
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <ConfirmLogoutModal
        open={showLogoutModal}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}

export default Navbar;