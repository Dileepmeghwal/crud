import React, { useState, useEffect } from "react";

const ProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({ name: "", price: "" });

  useEffect(() => {
    if (product) {
      setFormData({ name: product.name, price: product.price });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({ ...formData, price: parseFloat(formData.price) });
  };

  return (
    <div
      className="modal"
      style={{ display: "block" }}
      class="modal"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div className="modal-content">
          <span
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </span>
          <div className="modal-body">
            <h2>{product ? "Edit Product" : "Add Product"}</h2>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
            <label>Price:</label>
            <input
              type="text"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
