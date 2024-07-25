'use client'
import { useEffect, useState } from 'react';
import Nav from '../nav';
import Image from 'next/image';
import { fetchProductsSearch } from '@/utils/fetchProductsSearch';
import { fetchProducts } from '@/utils/fetchProducts';

export default function Products({ searchParams }) {
  const { categoria } = searchParams;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadProducts = async () => {
    const data = searchTerm
      ? await fetchProductsSearch({ title: searchTerm, category_id: categoryId, page })
      : await fetchProducts({ category_id: categoryId, page });
    setProducts(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
      let selectedCategory = data.find(cat => cat.category === categoria);
      setCategoryId(selectedCategory ? selectedCategory.id : null);
    };

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1); // Reset page to 1 when search term changes
      loadProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, categoryId]);

  const handleFilterCategory = (id, category) => async (e) => {
    setProducts([]);
    setCategoryId(id);
    setPage(1);
    const buttons = document.querySelectorAll('.category');
    buttons.forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
    changeUrl(category);
  };

  const handleSearch = (e) => {
    setProducts([]);
    setSearchTerm(e.target.value);
  };

  const changeUrl = (category) => {
    if (category === 'Todos') {
      window.history.pushState({}, '', '/products');
    } else {
      window.history.pushState({}, '', `/products?categoria=${category}`);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
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

      <div className='mt-10 flex gap-5 mx-auto md:justify-center justify-start overflow-x-auto pb-2'>
        <button id="category-0" className={`rounded-[100px] border p-3 category ${categoryId ? '' : 'active'}`} onClick={handleFilterCategory(null, "Todos")}>Todos</button>
        {
          categories && categories.map(({ id, category }) => (
            <button key={`${id}`} id={`category-${id}`} className={`rounded-[100px] border p-3 category ${categoryId == id ? 'active' : ''}`} onClick={handleFilterCategory(id, category)}>{category}</button>
          ))
        }
      </div>

      <div className="productos">
        {products.length > 0 ? products.map((product) => (
          <div key={product.id} className='producto shadowHover relative'>
            {product.num_products != 0 && (
              <span className='absolute top-3 right-3 bg-secondary rounded-[100px] p-2'>+
                {product.num_products}
              </span>
            )}
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
        </div>}
      </div>

      <div className="pagination flex justify-center items-center gap-5">
        <button onClick={handlePrevPage} disabled={page === 1} className='bold text-xl textShadowHover' >{"🢀"}</button>
        <span> {page} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages} className='bold text-xl textShadowHover'>{"🢂"}</button>
      </div>
    </div>
  );
}
