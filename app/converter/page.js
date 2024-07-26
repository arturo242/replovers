'use client'

import { useEffect, useState } from 'react';
import Nav from '../nav';
import Image from 'next/image';
import CopyLink from '../copyLink';

export default function LinkShortener() {
    const [longUrl, setLongUrl] = useState('');
    const [rawUrl, setRawUrl] = useState(null);
    const [agentUrls, setAgentUrls] = useState([]);
    const [domain, setDomain] = useState('');
    const [id, setId] = useState('');
    const [shopType, setShopType] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (domain && id) {
            handleRawUrl(shopType, id);
        }
    }, [domain, id]);

    const handleShorten = (event, otherUrl = null) => {
        const urlToProcess = otherUrl ?? longUrl;
        const domain = getDomain(urlToProcess);
        if (!domain) {
            setError('URL inválida');
            return;
        }

        setLoading(true)
        setError('');
        setDomain(domain);

        if (domain === "allchinabuy.com" || domain === "www.allchinabuy.com") {
            const { url } = getJsonFromUrl(longUrl);
            handleShorten(null, decodeURIComponent(url));
            return;
        }
        if (domain === "sugargoo.com" || domain === "www.sugargoo.com") {
            const { productLink } = getJsonFromUrl(longUrl);
            handleShorten(null, decodeURIComponent(productLink));
            return;
        }

        switch (domain) {
            case "cnfans.com":
            case "www.cnfans.com":
                const { shop_type, id } = getJsonFromUrl(urlToProcess);
                setShopType(shop_type);
                setId(id);
                break;
            case "weidian.com":
            case "www.weidian.com":
                const weidianData = getJsonFromUrl(urlToProcess);
                setShopType("weidian");
                setId(weidianData.itemID);
                break;
            case "item.taobao.com":
            case "www.item.taobao.com":
                const taobaoData = getJsonFromUrl(urlToProcess);
                setShopType("taobao");
                setId(taobaoData.id);
                break;
            case "hoobuy.com":
            case "www.hoobuy.com":
                const tempUrl = longUrl.substring(longUrl.indexOf("product/") + "product/".length).split("/");
                const shopType = tempUrl[0];
                const itemId = tempUrl[1];
                setShopType(shopType);
                setId(itemId);
                break;
            default:
                break;
        }
        setLoading(false);
    };

    const handleRawUrl = (shopType, id) => {
        let newRawUrl = {};
        let newAgentUrls = [];

        switch (shopType) {
            case "weidian":
            case "2":
                newRawUrl = {
                    image: "/agents/weidian.png",
                    link: `https://weidian.com/item.html?itemID=${id}`
                };
                newAgentUrls = [
                    {
                        image: "/agents/cnfans.png",
                        link: `https://cnfans.com/product/?shop_type=weidian&id=${id}`,
                    },
                    {
                        image: "/agents/hoobuy.png",
                        link: `https://hoobuy.com/product/2/${id}`,
                    },
                    {
                        image: "/agents/allchinabuy.png",
                        link: `https://allchinabuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(newRawUrl.link)}`,
                    },
                    {
                        image: "/agents/cssbuy.png",
                        link: `https://cssbuy.com/item-micro-${id}.html`,
                    },
                    {
                        image: "/agents/sugargoo.png",
                        link: `https://sugargoo.com/#/home/productDetail?productLink=${encodeURIComponent(newRawUrl.link)}`,
                    },
                ];
                break;
            case "taobao":
            case "1":
                newRawUrl = {
                    image: "/agents/taobao.png",
                    link: `https://item.taobao.com/item.htm?id=${id}`
                };
                newAgentUrls = [
                    {
                        image: "/agents/cnfans.png",
                        link: `https://cnfans.com/product/?shop_type=taobao&id=${id}`,
                    },
                    {
                        image: "/agents/hoobuy.png",
                        link: `https://hoobuy.com/product/1/${id}`,
                    },
                    {
                        image: "/agents/allchinabuy.png",
                        link: `https://allchinabuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(newRawUrl.link)}`,
                    },
                    {
                        image: "/agents/cssbuy.png",
                        link: `https://cssbuy.com/item-${id}.html`,
                    },
                    {
                        image: "/agents/sugargoo.png",
                        link: `https://sugargoo.com/#/home/productDetail?productLink=${encodeURIComponent(newRawUrl.link)}`,
                    },
                ];
                break;
            case "ali_1688":
            case "1688":
            case "0":
                newRawUrl = `https://detail.1688.com/offer/${id}.html`;
                newRawUrl = {
                    image: "/agents/1688.png",
                    link: `https://detail.1688.com/offer/${id}.html`
                };
                newAgentUrls = [
                    {
                        image: "/agents/cnfans.png",
                        link: `https://cnfans.com/product/?shop_type=ali_1688&id=${id}`
                    },
                    {
                        image: "/agents/hoobuy.png",
                        link: `https://hoobuy.com/product/0/${id}`
                    },
                    {
                        image: "/agents/allchinabuy.png",
                        link: `https://allchinabuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(newRawUrl.link)}`
                    },
                    {
                        image: "/agents/cssbuy.png",
                        link: `https://cssbuy.com/item-1688-${id}.html`
                    },
                    {
                        image: "/agents/sugargoo.png",
                        link: `https://sugargoo.com/#/home/productDetail?productLink=${encodeURIComponent(newRawUrl.link)}`
                    },
                ];
                break;
            default:
                break;
        }

        setRawUrl(newRawUrl);
        setAgentUrls(newAgentUrls);
    };

    const getDomain = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.host;
        } catch (e) {
            return null;
        }
    };

    const getJsonFromUrl = (url) => {
        const result = {};
        const urlSplit = url.split('?');
        const params = urlSplit[1];
        params.split("&").forEach(function (part) {
            const item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    };

    return (
        <div className=''>
            <Nav site="converter" />
            <h1 className="title text-center">Conversor</h1>
            <p className="mt-10 w-5/6 md:w-4/6 mx-auto text-lg">Este conversor se utiliza para transformar enlaces de productos entre distintos agentes. Convierte productos desde Taobao, 1688 y Weidian a los agentes de compra: CNFans, AllChinaBuy, Hoobuy, CssBuy & Sugargoo.</p>
            <div className="w-5/6 md:w-4/6 md:flex justify-center mx-auto mt-10 gap-4">
                <input
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    type="text"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder='Pega aquí tu enlace'
                />
                <button
                    className="boton shadowHover w-full md:w-2/6 mt-4 md:mt-0"
                    onClick={handleShorten}>Convertir</button>
            </div>
            {error && (
                <div className="mt-2 text-red-400 text-center">{error}</div>
            )}
            {
                loading && <div className='loading mt-20'></div>
            }

            {rawUrl && (
                <div className='mx-auto w-5/6 mt-10'>
                    <h2 className=''>Enlace bruto</h2>
                    <div className='flex items-center gap-3 border p-3 rounded-md border-secondary mt-10'>
                        <Image className='bg-white rounded-md' src={rawUrl.image} alt='rawUrl' width={60} height={60} />
                        <a className='secondaryHover' target='blank' href={rawUrl.link}>{rawUrl.link}</a>
                        <CopyLink link={rawUrl.link} />
                    </div>
                </div>
            )}

            {agentUrls.length > 0 && (
                <div className='mx-auto w-5/6 mt-10'>
                    <h2 className=''>Enlaces de los agentes</h2>
                    {agentUrls.map((agent, index) => (
                        <div className="flex items-center gap-3 border p-3 rounded-md border-secondary mt-5" key={index}>
                            <Image className='bg-white rounded-md' src={agent.image} alt='rawUrl' width={60} height={60} />
                            <a target='blank' className='secondaryHover' href={agent.link}>{agent.link}</a>
                            <CopyLink link={agent.link} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
