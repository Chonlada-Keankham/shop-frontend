import "../styles/why-choose-us.css";

function WhyChooseUs() {
  return (
    <section className="why-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-4">ทำไมต้องเลือกเรา</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h5>แคคตัสคุณภาพ</h5>
              <p>คัดสรรแคคตัสและไม้อวบน้ำที่แข็งแรงและสวยงาม</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h5>สั่งซื้อง่าย</h5>
              <p>มีระบบตะกร้าสินค้าและสั่งซื้อออนไลน์ใช้งานสะดวก</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="feature-box">
              <h5>พร้อมจัดส่ง</h5>
              <p>แพ็กสินค้าอย่างดีและพร้อมจัดส่งให้ถึงมือลูกค้า</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;