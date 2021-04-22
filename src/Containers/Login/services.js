import HttpLayer from '../../HttpLayer';

export const handleLogIn = (params) => {
  return HttpLayer.post(`${global.API_URL}/api/login`, params);
}
