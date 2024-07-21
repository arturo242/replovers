
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='opacity-[0.8] mt-10'>
            © RepLovers. 2024
            <div className='my-5 flex gap-5 justify-center items-center'>
                <a href='https://www.instagram.com/andalufinds/' target='blank' className='text-white hover:text-shadow'>
                    <Image src='/instagram.svg' alt='instagram' width={30} height={30} />
                </a>
                <a href='https://www.reddit.com/r/replovers/' target='blank' className='text-white'>
                    <Image src='/reddit.svg' alt='instagram' width={30} height={30} />
                </a>
                <a href='https://t.me/+Lnp-Bi7rJzw1MGZk' target='blank'>
                    <Image src='/telegram.svg' alt='instagram' width={30} height={30} />
                </a>
                <a href='https://www.youtube.com/@andalufinds' target='blank'>
                    <Image src='/youtube.svg' alt='instagram' width={30} height={30} />
                </a>
            </div>
            <p>Esta página contribuye a que los compradores no sean estafados a través de unos terceros.</p><p> <span className='text-secondary'>replovers.com</span> no apoya la venta de réplicas ni productos falsificados.</p>
        </footer>
    );
};

export default Footer;
