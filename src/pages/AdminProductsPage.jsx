import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
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
      const res = await api.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
      } else {
        await api.post("/products", formData);
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.image || product.img || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div>
      <h1 className="mb-4">จัดการสินค้า</h1>

      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body">
          <h4 className="mb-3">{editingId ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</h4>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">ชื่อสินค้า</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">ราคา</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">สต็อก</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">รูปสินค้า</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/img/Astrophytum.jpg"
              />
            </div>

            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-success">
                {editingId ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                ล้างฟอร์ม
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h4 className="mb-3">รายการสินค้า</h4>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-success">
                <tr>
                  <th>รูป</th>
                  <th>ชื่อสินค้า</th>
                  <th>ราคา</th>
                  <th>สต็อก</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ width: "100px" }}>
                      <img
                        src={product.image || product.img}
                        alt={product.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(product)}
                      >
                        แก้ไข
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductsPage;