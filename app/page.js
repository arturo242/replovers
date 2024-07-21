'use client'
import { useEffect, useState } from 'react';
import Nav from './nav';
import Image from 'next/image';

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
    <div className=''>
      <Nav />
      <div className='mt-20 flex flex-col justify-center items-center'>
        <Image
          className=''
          src="/logo_blanco_rojo.png"
          alt="Logo RepLovers"
          width={600}
          height={600}
        />
        <div className='flex gap-5'>
          <a href="/products?categoria=Destacados" className='boton shadowHover text-xl bold'>Productos destacados</a>
          <a target='blank' href="https://t.me/+Lnp-Bi7rJzw1MGZk" className='botonSecundario shadowHoverWhite text-xl bold'>Únete al telegram</a>
        </div>
        
        <h2 className='mt-20'>MEJORES PROVEEDORES</h2>
        <div className='providers mt-10 flex gap-5'>
          <a href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' className='provider shadowHover'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={200} height={200} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
          </a>
          <a href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' className='provider shadowHover'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={200} height={200} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
          </a>
          <a href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' className='provider shadowHover'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={200} height={200} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
          </a>
          <a href='https://cnfans.com/es/shops/?shop_type=weidian&shop_id=1650315740&num=1' target='blank' className='provider shadowHover'>
            <Image src="/providers/cowboy.jpg" alt="cowboy shop" width={200} height={200} />	
            <span className='p-2 text-lg bold'>Cowboy Shop</span>
          </a>
        </div>


        {/* featured items */}
        {/* boton ir a items destacados */}
      </div>
    </div>
  );
}
