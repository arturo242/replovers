'use client';

import { useState } from 'react';

function ProductForm() {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [message, setMessage] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlePhoto2Change = (e) => {
    setPhoto2(e.target.files[0]);
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
    const base64Photo2 = photo2 ? await getBase64(photo2) : null;
    const product = {
      link: link,
      title: title,
      price: price,
      photo: base64Photo ? base64Photo.split(',')[1] : null,
      photo2: base64Photo2 ? base64Photo2.split(',')[1] : null,
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
        setMessage('Product added successfully');
        setLink('');
        setTitle('');
        setPrice('');
        setPhoto(null);
        setPhoto2(null);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Something went wrong');
    }
  };

return (
  <div>
    <h1>Add New Product</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Link</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}

        />
      </div>
      <div>
        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}

        />
      </div>
      <div>
        <label>Foto principal</label>
        <input
          type="file"
          onChange={handlePhotoChange}

        />
      </div>
      <div>
        <label>Foto secundaria</label>
        <input
          type="file"
          onChange={handlePhoto2Change}

        />
      </div>
      {message && <p>{message}</p>}
      <button type="submit">Add Product</button>
    </form>
  </div>
);

}

export default function ProductPage() {
  return <ProductForm />;
}
