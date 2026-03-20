import "../styles/hero.css";

function HeroSection() {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container text-center">
        <h1 className="hero-title">Cactus House</h1>
        <p className="hero-subtitle">
          ร้านขายแคคตัสและไม้อวบน้ำออนไลน์
          <br />
          เลือกซื้อแคคตัสสวย ๆ พร้อมจัดส่งถึงบ้าน
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-success px-4">ดูสินค้า</button>
          <button className="btn btn-outline-light px-4">สมัครสมาชิก</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;