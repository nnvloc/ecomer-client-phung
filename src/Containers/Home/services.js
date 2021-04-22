import HttpLayer from '../../HttpLayer';

export const getProducts = () => {
  return HttpLayer.get(`${global.API_URL}/api/products`);
}

export const createOrder = (params) => {
  return HttpLayer.post(`${global.API_URL}/api/orders`, params);
}
