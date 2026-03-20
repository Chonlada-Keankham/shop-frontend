import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg cactus-navbar fixed-top ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          🌵 Cactus House
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                หน้าแรก
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#products">
                สินค้า
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart">
                🛒 ตะกร้า
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;