'use client';

import { useEffect, useState } from 'react';
import Nav from '../nav';
import Image from 'next/image';

export default function Providers() {

  const [providers, setProviders] = useState(null);
  const fetchProviders = async () => {
    const res = await fetch(`/api/providers`);
    const data = await res.json();
    setProviders(data);
  };

  useEffect(() => {
    fetchProviders()
  }, []);

  return (
    <div className=''>
      <Nav site="providers" />
      <h1 className='title text-center'>Proveedores</h1>
      <div className='providers'>
        {
          providers && providers.map((provider) => (
            <div key={provider.id} className='provider shadowHover relative'>
              <Image src={provider.photo ? `data:image/jpeg;base64,${Buffer.from(provider.photo).toString('base64')}` : '/logo_blanco.png'} alt={provider.name} width={348} height={348} />
              {/* <span className='p-2 text-lg bold'>{provider.name}</span> */}
              <a className='boton mb-5' href={provider.link} target='blank' >Ver tienda</a>
            </div>
          ))
        }


      </div>
    </div>
  );
}
