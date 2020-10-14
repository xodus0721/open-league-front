import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import getCommonLoginUserInfo from '../middlewares/getCommonLoginUserInfo';

const refresh = async () => {
  try {
    const res: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/token`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('refreshToken')}`,
        },
      },
    );
    Cookies.set('accessToken', res.data.accessToken);
    Cookies.set('refreshToken', res.data.refreshToken);
    getCommonLoginUserInfo();
    return 200;
  } catch (error) {
    return 401;
  }
};

export default refresh;
