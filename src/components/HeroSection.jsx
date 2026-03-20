import { useEffect, useState } from "react";
import "../styles/hero.css";

function HeroSection() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const syncAuthState = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("authChanged", syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("authChanged", syncAuthState);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="container">
        <h1 className="hero-title">Cactus House</h1>
        <p className="hero-subtitle">
          คัดสรรแคคตัสสวย ดูแลง่าย
          <br />
          พร้อมจัดส่งถึงบ้านในสไตล์ที่เรียบง่ายและอบอุ่น
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <a href="#products" className="btn btn-success px-4 py-2">
            ดูสินค้า
          </a>

          {!user ? (
            <a href="/register" className="btn btn-outline-light px-4 py-2">
              สมัครสมาชิก
            </a>
          ) : (
            <div className="hero-user">สวัสดี, {user.name}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;