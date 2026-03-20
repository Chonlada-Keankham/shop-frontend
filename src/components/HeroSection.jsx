import "../styles/hero.css";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <h1 className="hero-title">Cactus House</h1>
        <p className="hero-subtitle">
          คัดสรรต้นสวย ดูแลง่าย พร้อมจัดส่งถึงบ้าน
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <a href="#products" className="btn btn-success px-4 py-2">
            ดูสินค้า
          </a>
          <a href="/register" className="btn btn-outline-light px-4 py-2">
            สมัครสมาชิก
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;