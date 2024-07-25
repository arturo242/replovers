// utils/fetchProducts.js
export async function fetchProducts({ page = 1, limit = 15, category_id = null }) {
    const url = new URL('/api/products', window.location.origin);
    if (category_id) url.searchParams.append('category_id', category_id);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
  
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  