'use client';

import { useEffect, useState } from 'react';
import Nav from '../nav';
import Image from 'next/image';

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
    <div className='w-4/6 mx-auto p-6'>
      <Nav site="products"/>
      <div className="productos">
        {products && products.map((product) => (
          <div key={product.id} className='producto'>
            <a href={`products/${product.id}`} >
              <Image 
                src={`data:image/jpeg;base64,${Buffer.from(product.photo).toString('base64')}`} 
                alt={product.title}
                width={200}
                height={200}
                />
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
            </a>
            <a href={`${product.link}&ref=507768`} target='blank'>Link</a>
          </div>
        ))}
      </div>
    </div>
  );
}
