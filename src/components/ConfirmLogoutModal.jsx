import React from "react";

function ConfirmLogoutModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.45)" }}
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content border-0 shadow"
            style={{ borderRadius: "16px" }}
          >
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">ยืนยันการออกจากระบบ</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></button>
            </div>

            <div className="modal-body pt-2">
              <p className="mb-0 text-muted">
                คุณต้องการออกจากระบบใช่หรือไม่?
              </p>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmLogoutModal;