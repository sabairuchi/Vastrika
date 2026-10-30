// src/data/products.js
// Cloudinary helper to inject optimizations: f_auto,q_auto,h_900
export const getOptimizedImageUrl = (url, usePng = false) => {
  if (!url) return '';
  const transform = usePng ? 'f_png,q_auto,h_900' : 'f_auto,q_auto,h_900';
  return url.replace('/image/upload/', `/image/upload/${transform}/`);
};

export const products = [
  {}
];

export default products;
