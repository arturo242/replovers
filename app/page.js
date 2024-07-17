'use client'
import { useEffect, useState } from 'react';
import Nav from './nav';

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
    <div className='w-4/6 mx-auto p-6'>
        <Nav />
    </div>
  );
}
