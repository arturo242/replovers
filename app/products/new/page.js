'use client';

import { useEffect, useState } from 'react';
import Nav from '@/app/nav';
import EditProducts from '../editProducts';
import { useRouter } from 'next/navigation';

function ProductForm() {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [order, setOrder] = useState('');
  const [photo, setPhoto] = useState(null);
  const [num_products, setNumProducts] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState('');
  const [messageClass, setMessageClass] = useState('')
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    fetchCategories();
  }, [router]);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };


  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  //Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const base64Photo = photo ? await getBase64(photo) : null;
    const product = {
      link: link,
      title: title,
      price: price,
      order: order,
      photo: base64Photo ? base64Photo.split(',')[1] : null,
      num_products: num_products,
      categoryId: categoryId,
    };
    try {
      const response = await fetch('/api/add-product', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Se ha añadido el producto correctamente');
        setLink('');
        setTitle('');
        setPrice('');
        setOrder('');
        setPhoto(null);
        console.log(categoryId)
        setCategoryId('');
        setNumProducts(null);
        setMessageClass('text-green-500');
      } else {
        setMessage(data.message);
        setMessageClass('text-red-500');
      }
    } catch (error) {
      setMessage('Ha ocurrido un error');
      setMessageClass('text-red-500');
    }

  };

  return (
    <div>
      <Nav />
      <form onSubmit={handleSubmit} className='w-96 flex flex-col gap-5 mx-auto items-center'>
        <h1>Añadir producto</h1>
        <div>
          <label className='flex flex-col'>Link
            <input
              className='p-2 rounded-md'
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className='flex flex-col'>Título
            <input
              className='p-2 rounded-md'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className='flex flex-col'>Precio
            <input
              className='p-2 rounded-md'
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}

            />
          </label>
        </div>
        <div>
          <label className='flex flex-col'>Categoría
            <select className='p-2 rounded-md text-black'
            onChange={(e) => setCategoryId(e.target.value)} >
              <option value="">Selecciona</option>
              {categories && categories.map(({id, category}) => (
                <option key={id} value={id}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        <div className='flex gap-3'>
          <label className='flex flex-col'>Número de productos
            <input
              className='p-2 rounded-md'
              type="number"
              min={0}
              value={num_products}
              onChange={(e) => setNumProducts(e.target.value)}

            />
          </label>
          <label className='flex flex-col'>Orden
            <input
              className='p-2 rounded-md'
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className='flex flex-col'>Foto principal
            <input
              className='p-2 rounded-md text-white'
              type="file"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
        {message && <p className={messageClass}>{message}</p>}
        <button type="submit" className='bg-secondary p-2 rounded-md text-black'>Añadir producto</button>
      </form>

      <EditProducts/>
    </div>
  );

}

export default function ProductPage() {
  return <ProductForm />;
}
