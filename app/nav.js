'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Nav = ({site}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <nav className="md:flex hidden justify-between items-center nav pr-20">
        <Link href="/" className='logo'>
          <Image src='/logo_blanco.png'
              alt='logo'
              width={130}
              height={130} />
        </Link>
        <ul className='flex gap-5 items-center'>
          <li className={site == "products" ? "active" : ""}>
            <Link href="/products">
              Productos
            </Link>
          </li>
          <li className={site == "converter" ? "active" : ""}>
            <Link href="/converter">
              Conversor
            </Link>
          </li>
          <li className={site == "providers" ? "active" : ""}>
            <Link href="/providers">
              Proveedores
            </Link>
          </li>
          <li className={site == "tutorial" ? "active" : ""}>
            <Link href="/tutorial">
              Tutorial
            </Link>
          </li>
          <li >
            <Link href="/#faq">
              FAQ
            </Link>
          </li>
          <li className='inline-block text-white px-4 py-2 rounded-md text-center font-bold bg-[#3c3c3c] shadowHoverWhite'>
            <a href="https://t.me/+Lnp-Bi7rJzw1MGZk" target='blank'>Telegram</a>
          </li>
        </ul>
      </nav>
      <nav className="flex md:hidden flex-col justify-between items-center nav">
        <Link href="/" className='logo'>
          <Image src='/logo_blanco.png'
              alt='logo'
              width={130}
              height={130} />
        </Link>
        <div className="md:hidden" onClick={toggleMenu}>
          <div className="space-y-[6px]">
            <div className={`w-[30px] h-1 rounded-md bg-white transform origin-top-left transition-transform ${isOpen ? 'rotate-45' : ''}`}></div>
            <div className={`w-[25px] h-1 rounded-md bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-[30px] h-1 rounded-md bg-white transform origin-bottom-left transition-transform ${isOpen ? '-rotate-45' : ''}`}></div>
          </div>
        </div>
        <ul className={`flex-col gap-5 items-center mt-3 ${isOpen ? 'flex' : 'hidden'}`}>
          <li className={site == "products" ? "active" : ""}>
            <Link href="/products">
              Productos
            </Link>
          </li>
          <li className={site == "converter" ? "active" : ""}>
            <Link href="/converter">
              Conversor
            </Link>
          </li>
          <li className={site == "providers" ? "active" : ""}>
            <Link href="/providers">
              Proveedores
            </Link>
          </li>
          <li className={site == "tutorial" ? "active" : ""}>
            <Link href="/tutorial">
              Tutorial
            </Link>
          </li>
          <li >
            <Link href="/#faq">
              FAQ
            </Link>
          </li>
          <li className='font-bold'>
            <a  href="https://t.me/+Lnp-Bi7rJzw1MGZk" target='blank'>Telegram</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
