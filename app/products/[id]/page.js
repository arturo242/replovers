'use client';

import { useEffect, useState } from 'react';
import Nav from '@/app/nav';
import Image from 'next/image';

export default function Products({ params }) {
    const [product, setProduct] = useState('');
    const { id } = params;
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`/api/product/${id}`);
            const data = await res.json();
            setProduct(data[0]);
        };
        fetchProducts();
    }, []);
    console.log(product)
    return (
        <div className='w-4/6 mx-auto p-6'>
            <Nav site="products"/>
            <div className="producto">
                {
                    product != '' ?
                        <div>
                            <h2>{product.title}</h2>
                            <p>Price: ${product.price}</p>
                            <Image
                                src={`data:image/jpeg;base64,${Buffer.from(product.photo).toString('base64')}`}
                                alt={product.title}
                                width={800}
                                height={800}
                            />
                            <a href={product.link}>Link</a>
                        </div>
                        : ''
                }
            </div>
        </div>
    );
}
