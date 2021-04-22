import {useDispatch, useSelector} from 'react-redux';

export const useGetCurrentUser = () => {
  return useSelector(({User}) => {
    return User.user || null;
  });
}
