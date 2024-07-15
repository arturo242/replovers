'use client'

import { useEffect, useState } from 'react';

export default function LinkShortener() {
    const [longUrl, setLongUrl] = useState('');
    const [rawUrl, setRawUrl] = useState('');
    const [agentUrls, setAgentUrls] = useState([]);
    const [domain, setDomain] = useState('');
    const [id, setId] = useState('');
    const [shopType, setShopType] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
          const response = await fetch('/api/users');
          const data = await response.json();
          setUsers(data);
        }
        
        fetchUsers();
    }, []);
    
    console.log(users)
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
        <>
            <h1 className="text-2xl font-semibold">Convertidor</h1>
            <div className="w-full p-3 flex justify-center">
                <input
                    className="border border-gray-300 rounded-lg p-2 w-80"
                    type="text"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                />
                <button
                    className="border border-gray-300 rounded-lg p-2 ml-2"
                    onClick={handleShorten}>Convert</button>
            </div>

            {error && (
                <div className="mt-3 text-red-600">{error}</div>
            )}

            {rawUrl && (
                <div>
                    <h2 className={`mb-3 text-2xl font-semibold`}>Raw Link</h2>
                    <a target='blank' href={rawUrl}>{rawUrl}</a>
                </div>
            )}

            {agentUrls.length > 0 && (
                <div>
                    <h2 className={`mb-3 text-2xl font-semibold`}>Agent Links</h2>
                    {agentUrls.map((url, index) => (
                        <div className="" key={index}>
                            <a target='blank' href={url}>{url}</a>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
