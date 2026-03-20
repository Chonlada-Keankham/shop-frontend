import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { getUser, isLoggedIn, logout } from "../utils/auth";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = getUser();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    if (!loggedIn) {
      alert("กรุณาเข้าสู่ระบบก่อนเข้าตะกร้า");
      navigate("/login");
      return;
    }

    navigate("/cart");
  };

  const handleOrdersClick = () => {
    if (!loggedIn) {
      alert("กรุณาเข้าสู่ระบบก่อนดูประวัติคำสั่งซื้อ");
      navigate("/login");
      return;
    }

    navigate("/orders");
  };

  const handleLogout = () => {
    logout();
    alert("ออกจากระบบเรียบร้อยแล้ว");
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg cactus-navbar fixed-top ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/">
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
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active-nav" : ""}`}
                to="/"
              >
                หน้าแรก
              </Link>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="nav-link btn btn-link nav-btn-link"
                onClick={handleCartClick}
              >
                🛒 ตะกร้า
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="nav-link btn btn-link nav-btn-link"
                onClick={handleOrdersClick}
              >
                คำสั่งซื้อ
              </button>
            </li>

            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    เข้าสู่ระบบ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm nav-register-btn" to="/register">
                    สมัครสมาชิก
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-user-text">
                    {user?.name ? `สวัสดี, ${user.name}` : "ผู้ใช้งาน"}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    ออกจากระบบ
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;