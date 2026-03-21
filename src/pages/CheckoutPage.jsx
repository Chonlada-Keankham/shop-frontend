import { checkout } from "../api/orderApi";

const handleCheckout = async (e) => {
  e.preventDefault();

  if (
    !formData.customer_name ||
    !formData.customer_address ||
    !formData.customer_phone
  ) {
    alert("กรอกข้อมูลให้ครบ");
    return;
  }

  try {
    await checkout();

    navigate("/orders");
  } catch (error) {
    console.error("Checkout failed:", error);
    alert("สั่งซื้อไม่สำเร็จ");
  }
};