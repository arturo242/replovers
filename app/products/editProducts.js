'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchProducts } from '@/utils/fetchProducts';

export default function EditProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadProducts = async () => {
    const data = await fetchProducts({ page, category_id: categoryId });
    setProducts(data.data);
    setTotalPages(data.totalPages);
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
    let selectedCategory = data.find(cat => cat.id === categoryId);
    setCategoryId(selectedCategory ? selectedCategory.id : null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId !== null) {
      setPage(1); // Reset page number when category changes
    }
  }, [categoryId]);

  useEffect(() => {
    loadProducts();
  }, [page, categoryId]);

  const handleFilterCategory = (cat_id) => async (e) => {
    setProducts([]);
    setCategoryId(cat_id);
    setPage(1);
  };

  const handleDelete = (id) => async (e) => {
    e.preventDefault();
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const res = await fetch('/api/delete-product', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200) {
        loadProducts();
      }
    }
  };

  const handleChangeForm = (id) => async (e) => {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    button.classList.remove('bg-green-500');
    button.classList.remove('bg-red-500');
    button.classList.add('bg-orange-500');

    let product = {
      id: id,
      title: form.querySelector('input[name="title"]').value,
      link: form.querySelector('input[name="link"]').value,
      price: form.querySelector('input[name="price"]').value,
      order: form.querySelector('input[name="order"]').value,
      num_products: form.querySelector('input[name="num_products"]').value,
      category_id: form.querySelector('select[name="category_id"]').value,
    };

    const response = await fetch(`/api/edit-product`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (response.status === 200) {
      button.classList.remove('bg-orange-500');
      button.classList.add('bg-green-500');
    } else {
      button.classList.remove('bg-orange-500');
      button.classList.add('bg-red-500');
    }

    setTimeout(() => {
      button.classList.remove('bg-green-500');
      button.classList.remove('bg-red-500');
    }, 5000);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className='mt-20'>
      <h2 className='title text-center'>Productos</h2>
      <div className='mt-10 flex gap-5 mx-auto justify-center'>
        <button id="category-0" className={`rounded-[100px] border p-3 category ${categoryId ? '' : 'active'}`} onClick={handleFilterCategory(null)}>Todos</button>
        {categories && categories.map(({ id, category }) => (
          <button key={`${id}`} id={`category-${id}`} className={`rounded-[100px] border p-3 category ${categoryId == id ? 'active' : ''}`} onClick={handleFilterCategory(id)}>{category}</button>
        ))}
      </div>
      <div className="w-6/6">
        {products.length > 0 ? products.map((product) => (
          <form key={product.id} id={`product${product.id}`} className='flex gap-2 mt-3 justify-between items-center' onSubmit={handleChangeForm(product.id)}>
            <input
              className='p-2 rounded-md max-w-[100px]'
              type="number"
              name="order"
              value={product.order}
              onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, order: e.target.value } : p))}
            />
            <Image className='max-h-[220px]'
              src={product.photo ? `data:image/jpeg;base64,${Buffer.from(product.photo).toString('base64')}` : '/logo_blanco.png'}
              alt={product.title}
              width={80}
              height={80}
            />
            <input
              className='p-2 rounded-md'
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, title: e.target.value } : p))}
            />
            <input
              className='p-2 rounded-md'
              type="text"
              name="link"
              value={product.link}
              onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, link: e.target.value } : p))}
            />
            <input
              className='p-2 rounded-md max-w-[150px]'
              type="number"
              step={0.01}
              name="price"
              value={product.price}
              onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, price: e.target.value } : p))}
            />
            <select className='p-2 rounded-md text-black'
              name="category_id"
              value={product.category_id ?? 'Selecciona'}
              onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, category_id: e.target.value } : p))}
            >
              <option>Selecciona</option>
              {categories && categories.map(({ id, category }) => (
                <option
                  key={id}
                  value={id}
                >{category}
                </option>
              ))}
            </select>
            <input
              className='p-2 rounded-md max-w-[100px]'
              type="number"
              name="num_products"
              min={0}
              value={product.num_products}
              onChange={(e) => setProducts(products.map(p => p.id === product.id ? { ...p, num_products: e.target.value } : p))}
            />
            <button className='rounded-md border p-3' type="submit" target='blank'>Editar</button>
            <button className='boton' type="button" onClick={handleDelete(product.id)} target='blank'>Borrar</button>
          </form>
        )) : <div className='loadingProducts col-span-full'></div>}
      </div>
      <div className="pagination flex justify-center items-center gap-5 mt-3">
        <button onClick={handlePrevPage} disabled={page === 1} className='bold text-xl textShadowHover border px-3 py-1 rounded-[100px]' >{"<"}</button>
        <span> {page} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages} className='bold text-xl textShadowHover border px-3 py-1 rounded-[100px]'>{">"}</button>
      </div>
    </div>
  );
}
