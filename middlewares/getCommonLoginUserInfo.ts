import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const getCommonLoginUserInfo = () => {
  const decoded: {
    user: {
      name: string;
      email: string;
    };
  } = jwtDecode(Cookies.get('accessToken'));
  Cookies.set('email', decoded.user.email);
  Cookies.set('name', decoded.user.name);
};

export default getCommonLoginUserInfo;
