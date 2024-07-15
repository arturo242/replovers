// pages/index.js
'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className='w-100 mx-auto'>
      <h1>Productos</h1>
      <ul className='flex'>
        {products && products.map(product => (
          <li key={product.id}>{product.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
