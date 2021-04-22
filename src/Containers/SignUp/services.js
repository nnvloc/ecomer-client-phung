import HttpLayer from '../../HttpLayer';

export const handleSignUp = (values) => {
  return HttpLayer.post(`${global.API_URL}/api/sign-up`, values);
}
