import "../styles/product-card.css";

function ProductCard({ item, onAddToCart }) {
  if (!item) return null;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm cactus-card">
        <div className="image-wrapper">
          <img
            src={item.image}
            className="card-img-top cactus-image"
            alt={item.name}
          />
        </div>

        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{item.name}</h5>

          <p className="card-text mb-3">
            ราคา: {Number(item.price).toFixed(2)} บาท
          </p>

          <button
            className={`btn ${item.stock === 0 ? "btn-secondary" : "btn-success"}`}
            disabled={item.stock === 0}
            onClick={() => onAddToCart(item)}
          >
            {item.stock === 0 ? "สินค้าหมด" : "เพิ่มลงตะกร้า"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;