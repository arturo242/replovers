'use client';

import { useEffect, useState } from 'react';
import Nav from '../nav';
import Image from 'next/image';

export default function Products({ searchParams }) {
  const { categoria } = searchParams;
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const ref = '507768';
  const fetchProducts = async (cat_id = null) => {
    const res = cat_id ? await fetch(`/api/products?category_id=${cat_id}`) : await fetch(`/api/products`);
    const data = await res.json();
    setProducts(data);
  };
  const fetchProductsSearch = async (title, cat_id = null) => {
    const res = cat_id ? await fetch(`/api/products-search?category_id=${cat_id}&title=${title}`) : await fetch(`/api/products-search?title=${title}`);
    const data = await res.json();
    setProducts(data);
  };
  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
    let selectedCategory = data.find(cat => cat.category === categoria)
    setCategoryId(selectedCategory ? selectedCategory.id : null);
    if (selectedCategory) {
      fetchProducts(selectedCategory.id);
    } else {
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId !== null) {
      fetchProducts(categoryId);
    }
  }, [categoryId]);

  const handleFilterCategory = (id, category) => async (e) => {
    setProducts(null)
    setCategoryId(id);
    const buttons = document.querySelectorAll('.category');
    buttons.forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
    changeUrl(category)
    fetchProducts(id);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const title = e.target.value;
    if (title) fetchProductsSearch(title, categoryId);
    else fetchProducts(categoryId ? categoryId : null);
    
  }

  const changeUrl = (category) => {
    if (category === 'Todos') {
      window.history.pushState({}, '', '/products');
    } else {
      window.history.pushState({}, '', `/products?categoria=${category}`);
    }

  }

  return (
    <div className=''>
      <Nav site="products" />
      <h1 className='title text-center'>Productos</h1>
      <div className='w-full flex justify-center mt-10'>
        <input
          type="text"
          className="search bg-primary p-3 rounded-[100px] border text-white text-center"
          placeholder="Buscar"
          onChange={handleSearch}
        />
      </div>
      
      <div className='mt-10 flex gap-5 mx-auto md:justify-center justify-start overflow-x-auto '>
        <button id="category-0" className={`rounded-[100px] border p-3 category ${categoryId ? '' : 'active'}`} onClick={handleFilterCategory(null, "Todos")}>Todos</button>
        {
          categories && categories.map(({ id, category }) => (
            <button key={`${id}`} id={`category-${id}`} className={`rounded-[100px] border p-3 category ${categoryId == id ? 'active' : ''}`} onClick={handleFilterCategory(id, category)}>{category}</button>
          ))
        }
      </div>
      <div className="productos">
        {products ? products.map((product) => (
          <div key={product.id} className='producto shadowHover relative'>
            {product.num_products != 0 && (
            <span className='absolute top-3 right-3 bg-secondary rounded-[100px] p-2'>+
              {
                product.num_products
              }
            </span>)}
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
              <a className='boton w-full' href={`${product.link}`} target='blank'>COMPRAR EN CNFANS</a></div>
          </div>
        )) : <div className='loadingProducts col-span-full'>
          <Image
          src={'/logo_blanco_rojo.png'}
          width={300}
          height={300}
          alt='logo cargando'
          ></Image>
        </div>
        }
      </div>
    </div>
  );
}
