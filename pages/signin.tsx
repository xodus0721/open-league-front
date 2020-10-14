import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useState } from 'react';

import getCommonLoginUserInfo from '../middlewares/getCommonLoginUserInfo';

const SignIn = () => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
  });

  const [status, setStatus] = useState('');

  const { email, password } = account;

  const inputAccount = (e: { target: { name: string; value: string } }) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const signIn = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/signin`, {
        email,
        password,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          Cookies.set('accessToken', response.data.accessToken);
          Cookies.set('refreshToken', response.data.refreshToken);
          getCommonLoginUserInfo();
          setStatus('로그인 되었습니다!');
        }
      })
      .catch((error: AxiosError) => {
        switch (error.response.status) {
          case 401:
            setStatus('비밀번호가 일치하지 않습니다.');
            break;
          case 404:
            setStatus('계정이 존재하지 않습니다.');
            break;
          case 412:
            setStatus('입력란에 공백이 있습니다.');
            break;
          default:
            setStatus('알 수 없는 오류가 발생했습니다.');
            break;
        }
      });
  };

  const authorizationCodegrant = async () => {
    window.open(
      `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=identify%20email`,
      '_blank',
    );
    /*
     * accessToken
     * refreshToken
     */
  };

  return (
    <div>
      <h1>sign in</h1>
      <input type="text" name="email" placeholder="Enter email" onChange={inputAccount} />
      <br />
      <input type="password" name="password" placeholder="Enter Password" onChange={inputAccount} />
      <br />
      <button type="button" onClick={signIn}>
        Sign In
      </button>
      <h1>discord sign in</h1>
      <button type="button" onClick={authorizationCodegrant}>
        Discord Sign In
      </button>
      <br />
      <div>{status}</div>
      <Link href="/signup">
        <a>Need a sign up?</a>
      </Link>
      <br />
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};

export default SignIn;
