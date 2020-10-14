import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect } from 'react';

const logout = () => {
  const revokeToken = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/revoke`, undefined, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/revoke`, undefined, {
        headers: {
          Authorization: `Bearer ${Cookies.get('refreshToken')}`,
        },
      });
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('name');
      Cookies.remove('email');
    } finally {
      Router.push('/');
    }
  };
  useEffect(() => {
    revokeToken();
  }, []);
  return <div />;
};

export default logout;
