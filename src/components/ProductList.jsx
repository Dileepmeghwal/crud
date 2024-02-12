import React, { useState, useEffect } from "react";
import ProductModal from "./ProductModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    })
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch((error) => console.error("Error deleting product:", error));
  };

  const handleSaveProduct = (product) => {
    if (product.id) {
      // Update existing product
      fetch(`http://localhost:3001/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then(() => {
          setProducts(products.map((p) => (p.id === product.id ? product : p)));
          setShowModal(false);
        })
        .catch((error) => console.error("Error updating product:", error));
    } else {
      // Create new product
      fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((newProduct) => {
          setProducts([...products, newProduct]);
          setShowModal(false);
        })
        .catch((error) => console.error("Error creating product:", error));
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <ProductModal
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
