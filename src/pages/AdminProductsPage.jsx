import { useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProducts();

      const productList = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setProducts(productList);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      stock: "",
      image: "",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("ต้องการลบสินค้านี้ใช่หรือไม่?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      await fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("ลบสินค้าไม่สำเร็จ");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || formData.price === "" || formData.stock === "") {
      alert("กรุณากรอกชื่อสินค้า ราคา และสต๊อก");
      return;
    }

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image || null,
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("บันทึกสินค้าไม่สำเร็จ");
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">จัดการสินค้า</h2>
          <p className="text-muted mb-0">
            เพิ่ม แก้ไข และลบข้อมูลสินค้าจากระบบหลังบ้าน
          </p>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h4 className="mb-3">
            {editingId ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">ชื่อสินค้า</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="ชื่อสินค้า"
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">ราคา</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">สต๊อก</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">รูปภาพ (URL)</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-success">
                {editingId ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="mb-3">รายการสินค้า</h4>

          {loading ? (
            <p className="mb-0">กำลังโหลดสินค้า...</p>
          ) : products.length === 0 ? (
            <p className="mb-0">ยังไม่มีสินค้าในระบบ</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>รูป</th>
                    <th>ชื่อสินค้า</th>
                    <th>ราคา</th>
                    <th>สต๊อก</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        ) : (
                          <span className="text-muted">ไม่มีรูป</span>
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price} บาท</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(product)}
                          >
                            แก้ไข
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(product.id)}
                          >
                            ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProductsPage;