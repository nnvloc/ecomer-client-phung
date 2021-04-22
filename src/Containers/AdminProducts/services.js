import HttpLayer from '../../HttpLayer';

export const getProducts = () => {
  return HttpLayer.get(`${global.API_URL}/api/products`);
}
