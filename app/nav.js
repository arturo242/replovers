'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Nav = ({site}) => {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center nav pr-20">
      <Link href="/">
        <Image src='/logo_blanco.png'
            alt='logo'
            width={250}
            height={250} />
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
        <li className={site == "tutorial" ? "active" : ""}>
          <Link href="/tutorial">
            Tutorial
          </Link>
        </li>
        <li>
          <a className='inline-block text-white px-4 py-2 rounded-md text-center font-bold bg-[#3c3c3c] shadowHoverWhite' href="https://t.me/andalupanda" target='blank'>Telegram</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
