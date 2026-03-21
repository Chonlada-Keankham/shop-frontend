import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
      console.error(error);
      toast.error("โหลดสินค้าไม่สำเร็จ");
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
    if (!window.confirm("ต้องการลบสินค้านี้ใช่หรือไม่?")) return;

    try {
      await deleteProduct(id);
      toast.success("ลบสินค้าเรียบร้อยแล้ว");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("ลบสินค้าไม่สำเร็จ");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || formData.price === "" || formData.stock === "") {
      toast.warning("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    if (Number(formData.price) < 0 || Number(formData.stock) < 0) {
      toast.warning("ราคาและสต๊อกต้องไม่ติดลบ");
      return;
    }

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image || null,
    };

    try {
      setSubmitting(true);

      if (editingId) {
        await updateProduct(editingId, payload);
        toast.success("แก้ไขสินค้าเรียบร้อยแล้ว");
      } else {
        await createProduct(payload);
        toast.success("เพิ่มสินค้าเรียบร้อยแล้ว");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("บันทึกสินค้าไม่สำเร็จ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-3">จัดการสินค้า</h2>

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>{editingId ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</h4>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="ชื่อสินค้า"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="ราคา"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="สต๊อก"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="URL รูป"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              {/* 🔥 Preview รูป */}
              {formData.image && (
                <div className="col-12">
                  <img
                    src={formData.image}
                    alt="preview"
                    style={{ width: 120, borderRadius: 8 }}
                  />
                </div>
              )}
            </div>

            <div className="mt-3">
              <button
                className="btn btn-success"
                disabled={submitting}
              >
                {submitting
                  ? "กำลังบันทึก..."
                  : editingId
                  ? "บันทึก"
                  : "เพิ่มสินค้า"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={resetForm}
                >
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <p>กำลังโหลด...</p>
          ) : products.length === 0 ? (
            <p>ไม่มีสินค้า</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>รูป</th>
                  <th>ชื่อ</th>
                  <th>ราคา</th>
                  <th>สต๊อก</th>
                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      {p.image ? (
                        <img
                          src={p.image}
                          style={{ width: 50, borderRadius: 6 }}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.stock}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(p)}
                      >
                        แก้ไข
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProductsPage;