'use client'
import React, { useState } from 'react';

const CopyLink = ({ link }) => {
    const [copied, setCopied] = useState(false)
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
        } catch (err) {
            console.error('Error al copiar el enlace: ', err);
        }
        setTimeout(() => {
            setCopied(false);
        }, 8000);
    };

    return (
        <button onClick={copyToClipboard} >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={copied ? "stroke-green-400" : "hover:stroke-[#fe8080]"}
            >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg></button>
    );
};

export default CopyLink;