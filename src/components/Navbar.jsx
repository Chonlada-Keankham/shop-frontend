import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg cactus-navbar fixed-top ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container">
        <a className="navbar-brand text-white fw-bold" href="#">
          🌵 Cactus House
        </a>

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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">หน้าแรก</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">สินค้า</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">เกี่ยวกับ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">ติดต่อ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">🛒</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;