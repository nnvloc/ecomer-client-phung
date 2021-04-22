import HttpLayer from '../../HttpLayer';

export const getOrders = () => {
  return HttpLayer.get(`${global.API_URL}/api/orders`);
}
