'use client';

import { useEffect, useState } from 'react';
import Nav from '../nav';
import Image from 'next/image';

export default function Providers() {

  // const [products, setProducts] = useState(null);
  const ref = '507768';
  // const fetchProducts = async (cat_id = null) => {
  //   const res = cat_id ? await fetch(`/api/products?category_id=${cat_id}`) : await fetch(`/api/products`);
  //   const data = await res.json();
  //   setProducts(data);
  // };

  // useEffect(() => {
  //   if (categoryId !== null) {
  //     fetchProducts(categoryId);
  //   }
  // }, [categoryId]);

  return (
    <div className=''>
      <Nav site="providers" />
      <h1 className='title text-center'>Proveedores</h1>
      
      <div className='providers'>
          <div className='provider shadowHover relative'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={348} height={348} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
            <a className='boton mb-5' href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' >Ver tienda</a>
          </div>
          <div className='provider shadowHover relative'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={348} height={348} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
            <a className='boton mb-5' href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' >Ver tienda</a>
          </div>
          <div className='provider shadowHover relative'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={348} height={348} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
            <a className='boton mb-5' href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' >Ver tienda</a>
          </div>
          <div className='provider shadowHover relative'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={348} height={348} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
            <a className='boton mb-5' href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' >Ver tienda</a>
          </div>
          <div className='provider shadowHover relative'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={348} height={348} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
            <a className='boton mb-5' href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' >Ver tienda</a>
          </div>
          
          
        </div>
    </div>
  );
}
