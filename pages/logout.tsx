import axios from 'axios';
import Router from 'next/router';
import React, { useEffect } from 'react';

const logout = () => {
  const revokeToken = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/revoke`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/revoke`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
          },
        },
      );
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      Router.push('/main');
    }
  };
  useEffect(() => {
    revokeToken();
  }, []);
  return <div />;
};

export default logout;
