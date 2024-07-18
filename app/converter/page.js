'use client'

import { useEffect, useState } from 'react';
import Nav from '../nav';

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
        let newRawUrl = '';
        let newAgentUrls = [];

        switch (shopType) {
            case "weidian":
            case "2":
                newRawUrl = `https://weidian.com/item.html?itemID=${id}`;
                newAgentUrls = [
                    `https://cnfans.com/product/?shop_type=weidian&id=${id}`,
                    `https://hoobuy.com/product/2/${id}`,
                    `https://allchinabuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(newRawUrl)}`,
                    `https://cssbuy.com/item-micro-${id}.html`,
                    `https://sugargoo.com/#/home/productDetail?productLink=${encodeURIComponent(newRawUrl)}`,
                ];
                break;
            case "taobao":
            case "1":
                newRawUrl = `https://item.taobao.com/item.htm?id=${id}`;
                newAgentUrls = [
                    `https://cnfans.com/product/?shop_type=taobao&id=${id}`,
                    `https://hoobuy.com/product/1/${id}`,
                    `https://allchinabuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(newRawUrl)}`,
                    `https://cssbuy.com/item-${id}.html`,
                    `https://sugargoo.com/#/home/productDetail?productLink=${encodeURIComponent(newRawUrl)}`,
                ];
                break;
            case "tmall":
                newRawUrl = `https://detail.tmall.com/item.htm?id=${id}`;
                break;
            case "1688":
            case "0":
                newRawUrl = `https://detail.1688.com/offer/${id}.html`;
                newAgentUrls = [
                    `https://cnfans.com/product/?shop_type=ali_1688&id=${id}`,
                    `https://hoobuy.com/product/0/${id}`,
                    `https://allchinabuy.com/en/page/buy?from=search-input&url=${encodeURIComponent(newRawUrl)}`,
                    `https://cssbuy.com/item-1688-${id}.html`,
                    `https://sugargoo.com/#/home/productDetail?productLink=${encodeURIComponent(newRawUrl)}`,
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
            <Nav site="converter"/>
            <h1 className="title text-center">Conversor</h1>
            <p className="text-center mt-10">aqui va el texto</p>
            <div className="w-3/6 p-3 flex justify-center mx-auto mt-10 gap-4">
                    <input
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        type="text"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                    <button
                        className="boton shadowHover w-2/6"
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
                    <h2 className='text-secondary'>Enlace bruto</h2>
                    <a className='mt-3 secondaryHover' target='blank' href={rawUrl}>{rawUrl}</a>
                </div>
            )}

            {agentUrls.length > 0 && (
                <div className='mx-auto w-5/6 mt-10'>
                    <h2 className='text-secondary'>Enlaces de los intermediarios</h2>
                    {agentUrls.map((url, index) => (
                        <div className="mt-3" key={index}>
                            <a target='blank' className='secondaryHover' href={url}>{url}</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
