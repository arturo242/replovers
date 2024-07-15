'use client';

import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products && products.map((product) => (
        <div key={product._id}>
          <a href={product.link}>
            <h2>{product.title}</h2>
          </a>
          <p>Price: ${product.price}</p>
          <img src={`data:image/jpeg;base64,${Buffer.from(product.photo).toString('base64')}`} alt={product.title} />
          <img src={`data:image/jpeg;base64,${Buffer.from(product.photo2).toString('base64')}`} alt={product.title} />
        </div>
      ))}
    </div>
  );
}
