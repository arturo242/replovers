'use client';

import { useEffect, useState } from 'react';
import Nav from '@/app/nav';

function ProviderForm() {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [featured, setFeatured] = useState(0);
  const [order, setOrder] = useState('');
  const [photo, setPhoto] = useState(null);
  const [providers, setProviders] = useState([])
  const [messageClass, setMessageClass] = useState('')
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const base64Photo = photo ? await getBase64(photo) : null;
    const provider = {
      link: link,
      name: name,
      featured: featured,
      order: order,
      photo: base64Photo ? base64Photo.split(',')[1] : null,
    };
    try {
      const response = await fetch('/api/add-provider', {
        method: 'POST',
        body: JSON.stringify(provider),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Se ha añadido el proveedor correctamente');
        setLink('');
        setName('');
        setFeatured(0);
        setOrder('');
        setPhoto(null);
        setMessageClass('text-green-500');
      } else {
        setMessage(data.message);
        setMessageClass('text-red-500');
      }
    } catch (error) {
      setMessage('Ha ocurrido un error');
      setMessageClass('text-red-500');
    }
    fetchProviders()
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/delete-provider', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Proveedor eliminado correctamente');
        setMessageClass('text-orange-500');
      } else {
        setMessage(data.message);
        setMessageClass('text-red-500');
      }
    } catch (error) {
      setMessage('Ha ocurrido un error');
      setMessageClass('text-red-500');
    }
    fetchProviders()
  }
  const fetchProviders = async () => {
    const response = await fetch('/api/providers');
    const data = await response.json();
    setProviders(data);
  };
  useEffect(() => {
    fetchProviders();
  }, []);
  return (
    <div>
      <Nav />
      <form onSubmit={handleSubmit} className='w-96 flex flex-col gap-5 mx-auto'>
        <h1>Añadir proveedor</h1>
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
          <label className='flex flex-col'>Nombre
            <input
              className='p-2 rounded-md'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}

            />
          </label>
        </div>
        <div>
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
          <label className='flex flex-col'>Foto
            <input
              className='p-2 rounded-md text-white'
              type="file"
              onChange={handlePhotoChange}

            />
          </label>
        </div>
        <div>
          <label className='flex justify-center'>
            <input
              className='p-2 rounded-md text-white mr-2'
              type="checkbox"
              onChange={(e) => setFeatured(e.target.checked ? 1 : 0)}
            /> Destacado
          </label>
        </div>
        {message && <p className={messageClass}>{message}</p>}
        <button type="submit" className='bg-secondary p-2 rounded-md text-black'>Añadir proveedor</button>
      </form>

      {/* <EditProviders/> */}

      <div className='text-center mt-10 w-40 mx-auto'>
        <h2>Proveedores</h2>
        {
          // List of categories and a button to delete them
          providers && providers.map(({id, name, featured, order}) => (
            <div key={id} className="flex items-center justify-between mt-2">
              <p>{featured ? '★' : ''} {name}</p>
              <button
                onClick={() => handleDelete(id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Delete
              </button>
              <p>{order}</p>
            </div>
          ))
        }
      </div>
    </div>
  );

}

export default function ProviderPage() {
  return <ProviderForm />;
}
