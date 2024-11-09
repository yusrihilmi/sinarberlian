import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported
import NavbarContent from './NavbarContent/NavbarContent';

function ProductRefrigerator() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    linkShopee: '',
    linkTokopedia: '',
    whatsapp: '',
    image: ''
  });
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (product) => {
    setEditProductId(product.id);
    setNewProduct({
      title: product.title,
      description: product.description,
      linkShopee: product['link-shopee'],
      linkTokopedia: product['link-tokopedia'],
      whatsapp: product.whatsapp,
      image: product.image || '' // Set image as URL for display
    });
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('description', newProduct.description);
    formData.append('link-shopee', newProduct.linkShopee);
    formData.append('link-tokopedia', newProduct.linkTokopedia);
    formData.append('whatsapp', newProduct.whatsapp);
    if (newProduct.image instanceof File) {
      formData.append('image', newProduct.image);
    }
  
    try {
      let response;
      if (editProductId) {
        // Update existing product
        response = await fetch(`http://localhost:8000/api/products/${editProductId}`, {
          method: 'POST', // Ensure backend handles POST for updates with FormData
          body: formData,
        });
      } else {
        // Add new product
        response = await fetch('http://localhost:8000/api/products', {
          method: 'POST',
          body: formData,
        });
      }
  
      if (response.ok) {
        setNewProduct({
          title: '',
          description: '',
          linkShopee: '',
          linkTokopedia: '',
          whatsapp: '',
          image: ''
        });
        setEditProductId(null); // Clear edit state
        alert(editProductId ? 'Product updated successfully!' : 'Product added successfully!');
        fetchProducts();
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Clear the token and update the login state
      localStorage.removeItem('token');
      setIsLoggedIn(false);

      // Redirect to login page
      window.location.href = '/admin-login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
        alert('Product deleted successfully!');
      } else {
        alert('Error deleting product');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!isLoggedIn) {
    return <p>Redirecting to login...</p>;
  }

  return (
      <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Admin Dashboard</h2>

          <NavbarContent/>

          <form onSubmit={handleAddOrUpdateProduct}>
              <div>
                  <label>Title:</label>
                  <input
                      type="text"
                      value={newProduct.title}
                      onChange={(e) =>
                          setNewProduct({
                              ...newProduct,
                              title: e.target.value,
                          })
                      }
                  />
              </div>
              <div>
                  <label>Description:</label>
                  <textarea
                      value={newProduct.description}
                      onChange={(e) =>
                          setNewProduct({
                              ...newProduct,
                              description: e.target.value,
                          })
                      }
                  />
              </div>
              <div>
                  <label>Shopee Link:</label>
                  <input
                      type="text"
                      value={newProduct.linkShopee}
                      onChange={(e) =>
                          setNewProduct({
                              ...newProduct,
                              linkShopee: e.target.value,
                          })
                      }
                  />
              </div>
              <div>
                  <label>Tokopedia Link:</label>
                  <input
                      type="text"
                      value={newProduct.linkTokopedia}
                      onChange={(e) =>
                          setNewProduct({
                              ...newProduct,
                              linkTokopedia: e.target.value,
                          })
                      }
                  />
              </div>
              <div>
                  <label>WhatsApp:</label>
                  <input
                      type="text"
                      value={newProduct.whatsapp}
                      onChange={(e) =>
                          setNewProduct({
                              ...newProduct,
                              whatsapp: e.target.value,
                          })
                      }
                  />
              </div>
              {newProduct.image && !(newProduct.image instanceof File) && (
                  <div>
                      <img
                          src={`http://localhost:8000/storage/${newProduct.image}`}
                          alt="Current Product"
                          style={{ maxWidth: "100px" }}
                      />
                      <p>
                          Current image (you can replace it by uploading a new
                          one)
                      </p>
                  </div>
              )}
              <input
                  type="file"
                  onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.files[0] })
                  }
              />
              <button type="submit">
                  {editProductId ? "Update Product" : "Add Product"}
              </button>
          </form>

          <div>
              <h3>Products List</h3>
              <ul>
                  {products.map((product) => (
                      <li key={product.id}>
                          <h4>{product.title}</h4>
                          <p>{product.description}</p>
                          <a href={product.linkShopee}>Shopee</a>
                          <a href={product.linkTokopedia}>Tokopedia</a>
                          <button
                              onClick={() => handleDeleteProduct(product.id)}
                          >
                              Delete
                          </button>
                          <img src={product.image} alt={product.title} />
                          <button onClick={() => handleEdit(product)}>
                              Edit
                          </button>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
}

export default ProductRefrigerator;
