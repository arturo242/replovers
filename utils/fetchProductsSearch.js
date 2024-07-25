// utils/fetchProductsSearch.js
export async function fetchProductsSearch({ title = "", category_id = null, page = 1, limit = 15 }) {
  const url = new URL('/api/products-search', window.location.origin);
  if (category_id) url.searchParams.append('category_id', category_id);
  if (title) url.searchParams.append('title', title);
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);

  const res = await fetch(url);
  const data = await res.json();
  return data;
}
