'use client';

import { useEffect, useState } from 'react';
import Nav from '../nav';
import Image from 'next/image';

export default function Products() {
  const [products, setProducts] = useState(null);
  const ref = '507768';
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className=''>
      <Nav site="products"/>
      <h1 className='title text-center'>Productos</h1>
      <div className="productos">
        {products ? products.map((product) => (
          <div key={product.id} className='producto shadowHover'>
            <div>
              <Image className='max-h-[220px]'
                src={product.photo ? `data:image/jpeg;base64,${Buffer.from(product.photo).toString('base64')}` : '/logo_blanco.png'}
                alt={product.title}
                width={348}
                height={348}
                />
                <h2 className='font-bold mt-2 productTitle'>{product.title}</h2>
              <p>{product.price}€</p>
            </div>
            <div>
              <a className='boton w-full' href={`${product.link}&ref=${ref}`} target='blank'>COMPRAR EN CNFANS</a></div>
          </div>
        )) : <div className='loading mt-20'></div>
      }
      </div>
    </div>
  );
}
