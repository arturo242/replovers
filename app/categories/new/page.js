'use client';

import Nav from '@/app/nav';
import { useEffect, useState } from 'react';

function CategoryForm() {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState('');
  const [messageClass, setMessageClass] = useState('');

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/delete-category', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Categoría eliminada correctamente');
        setMessageClass('text-orange-500');
      } else {
        setMessage(data.message);
        setMessageClass('text-red-500');
      }
    } catch (error) {
      setMessage('Ha ocurrido un error');
      setMessageClass('text-red-500');
    }
    fetchCategories()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-category', {
        method: 'POST',
        body: JSON.stringify({ category }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Categoría añadida correctamente');
        setMessageClass('text-green-500');
        setCategory('');
      } else {
        setMessage(data.message);
        setMessageClass('text-red-500');
      }
    } catch (error) {
      setMessage('Ha ocurrido un error');
      setMessageClass('text-red-500');
    }
    fetchCategories()
  };

  // Fetch categories
  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className=''>
      <Nav />
      <form onSubmit={handleSubmit} className='w-96 flex flex-col gap-5 mx-auto'>
        <h1>Añadir categoría</h1>
        <div>
          <label className='flex flex-col'>Nombre
            <input
              className='p-2 rounded-md'
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            /></label>
        </div>

        {message && <p className={messageClass}>{message}</p>}
        <button type="submit" className="bg-secondary p-2 rounded-md">Añadir categoría</button>
      </form>

      <div className='text-center mt-10 w-40 mx-auto'>
        <h2>Categorías</h2>
        {
          // List of categories and a button to delete them
          categories && categories.map(({id, category}) => (
            <div key={id} className="flex items-center justify-between mt-2">
              <p>{category}</p>
              <button
                onClick={() => handleDelete(id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );

}

export default function CategoryPage() {
  return <CategoryForm />;
}
