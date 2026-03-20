import "../styles/product-card.css";

function ProductCard({ item, onAddToCart }) {
  if (!item) return null;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm cactus-card">
        {item.image ? (
          <img
            src={item.image}
            className="card-img-top cactus-image"
            alt={item.name}
          />
        ) : (
          <div className="no-image-box d-flex align-items-center justify-content-center">
            ไม่มีรูปสินค้า
          </div>
        )}

        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{item.name}</h5>
          <p className="card-text mb-1">ราคา: {item.price} บาท</p>
          <p className="card-text mb-3">คงเหลือ: {item.stock}</p>
          <button
            className="btn btn-success"
            onClick={() => onAddToCart(item)}
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;