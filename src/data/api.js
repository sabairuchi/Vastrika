// API client for VASTRIKA boutique
import products from './products.json';

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export const TYPES = ['Lehenga', 'Saree', 'Sherwani', 'Kurta', 'Bandhgala', 'Jewellery', 'Footwear', 'Bags'];

// Fetch bestsellers from the server endpoint /api/bestsellers
export async function getBestsellers(options = {}) {
  const query = new URLSearchParams();
  if (options.error) query.set('error', options.error);
  if (options.status) query.set('status', options.status);
  const queryString = query.toString() ? `?${query.toString()}` : '';

  const res = await fetch(`/api/bestsellers${queryString}`);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.message || 'Failed to load Bestsellers collection');
    error.status = res.status;
    error.code = data.code || 'INTERNAL_SERVER_ERROR';
    error.referenceId = data.referenceId || 'VST-500-784291';
    error.data = data;
    throw error;
  }

  return data;
}

// params: { type, department, tag ('new'|'bestseller'|'sale'), q, minPrice, maxPrice, sort ('newest'|'price-low'|'price-high'|'rating'), page, limit }
export async function getProducts(params = {}) {
  await delay();
  const { type, department, tag, q, minPrice = 0, maxPrice = Infinity, sort = 'newest', page = 1, limit = 12 } = params;
  let list = products.filter((p) =>
    (!type || p.type.toLowerCase() === type.toLowerCase()) &&
    (!department || p.department === department) &&
    (!tag || p.tags.includes(tag)) &&
    p.price >= minPrice && p.price <= maxPrice &&
    (!q || `${p.name} ${p.fabric} ${p.work} ${p.type}`.toLowerCase().includes(q.toLowerCase()))
  );
 
  return { data: list, total, page, pages: Math.ceil(total / limit) };
}

export async function getProduct(id) {
  await delay(200);
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error('Product not found');
  const related = products.filter((x) => x.type === p.type && x.id !== id).slice(0, 4);
  return { data: p, related };
}

export async function getCategories() {
  await delay(100);
  return TYPES.map((t) => ({ type: t, count: products.filter((p) => p.type === t).length }));
}
