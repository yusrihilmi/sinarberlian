import React, { useState, useEffect } from 'react';

function LandingPageProductRefrigerator() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Our Product Refrigerators</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} />
            <a href={product.linkShopee}>Shopee</a>
            <a href={product.linkTokopedia}>Tokopedia</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPageProductRefrigerator;
