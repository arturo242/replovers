'use client'
import { useEffect, useState } from 'react';
import Nav from './nav';
import Image from 'next/image';
import FAQItem from './faqItem';
import HeartCanvas from './heart3d';

export default function Home() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async function fetchProviders() {
      const response = await fetch('/api/providers?featured=1');
      const data = await response.json();
      setProviders(data);
    }

    fetchProviders();
  }, []);


  return (
    <>
      <Nav />
      <div className='mt-20 flex flex-col justify-center items-center'>
        <Image
          className='logo'
          src="/logo_blanco_rojo.png"
          alt="Logo RepLovers"
          width={600}
          height={600}
        />
        <div className='flex flex-col md:flex-row gap-5'>
          <a target='blank' href="https://docs.google.com/spreadsheets/d/1d8d3BLMxaUomRufs6aWnssNY5RWEXPl5kbUO-8Be-5Y/edit?usp=sharing" className='boton shadowHover text-xl bold'>
            Spreadsheet (+3000)
          </a>
          <a href="https://www.reddit.com/r/replovers/" target='blank' className='botonSecundario shadowHoverWhite text-xl bold'>Únete al reddit</a>
          <a target='blank' href="https://t.me/+Lnp-Bi7rJzw1MGZk" className='botonSecundario shadowHoverWhite text-xl bold'>Únete al telegram</a>
        </div>

        <h2 className='mt-20'>{providers ? 'MEJORES PROVEEDORES' : ''}</h2>
        <div className='featuredProviders'>
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
      {/* YOUTUBE */}
      <h2 className='mt-20 text-center'>Videos</h2>
      <div id="youtube" className='flex flex-col justify-center items-center md:flex-row gap-10 mt-20 p-5'>
        <iframe className='rounded-lg' width="600" height="337" src="https://www.youtube.com/embed/psaYmqfUH9o" allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>

        {/* <div className='channel'>
          <a ></a>
        </div> */}
        {/* <iframe className='rounded-lg' width="600" height="337" src="https://www.youtube.com/embed/JYGPqwNHeUc" allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe> */}
      </div>


      {/* FAQ */}
      <div id="faq" className='flex flex-col items-center'>
        <h2 className='mt-20'>FAQ</h2>

        <FAQItem
          question='¿Es seguro CNFANS?'
          answer='CNFans es una plataforma que te permite comprar productos de China de forma segura y sencilla.'
          points={[
            'Tus datos personales y de pago están protegidos con las últimas tecnologías de encriptación.',
            'Cada producto pasa por un riguroso control de calidad antes de ser enviado.',
            'Cuentan con un equipo de soporte disponible para ayudarte en cualquier momento.',
          ]}
        />

        <FAQItem
          question='¿Qué significa cada fase de mi pedido?'
          answer=''
          points={[
            'Order Processing ➡ Se le asigna a un trabajador que realice la compra del producto que hayas pedido al proveedor.',
            'Order Pending ➡ CNFans se pone en contacto con el proveedor, pero ahora se necesita la respuesta de este, para saber si tiene stock y está disponible para enviar al almacén de CNFans.',
            'Purchased ➡ Una vez que se verifica que el producto está disponible, se compra.',
            'Seller Sent ➡ Tu producto ya ha salido del almacén del proveedor con destino al warehouse de CNFans.',
            'Arrived at the warehouse / Waiting for QC Photos ➡ El producto ya ha llegado al almacén y ahora el siguiente paso es realizar el control de calidad. Se hacen fotos del producto y os las envían para que podáis verlo.',
            'Received ➡ Vuestro producto ya está en el almacén, ha pasado el QC y ya está listo para poder ser enviado.',
          ]}
        />
        <FAQItem
          question=' ¿Cómo se realiza la declaración de mi paquete?'
          answer='En CNFANS, no tienes que preocuparte por nada relacionado con la declaración de tu
paquete. Todo el proceso se maneja de manera automática, garantizando eficiencia y
comodidad para ti. Ahorrándote tiempo y esfuerzo, la propia página se encarga de gestionar
todo.'
        />
        <FAQItem
          question='¿Cuánto tardan en llegar los productos al almacén?'
          answer='El tiempo estimado es de entre 5-10 días , aunque hay algunos que pueden tardar más y otros menos. Todo depende del tiempo que tarda el proveedor, hay proveedores que tardan poco en
enviarlo y otros que tardan más. Tened en cuenta que China es muy grande, y dependiendo de donde se encuentre el proveedor en cuanto a cercanía de los almacenes tardará más o menos tiempo.'
        />

      </div>
    </>
  );
}
