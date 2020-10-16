import axios, { AxiosError, AxiosResponse } from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const SignUp = () => {
  const [status, setStatus] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    password: '',
    email: '',
  });

  const { name, password, email } = profile;

  const inputProfile = (e: { target: { name: string; value: string } }) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const signUp = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/signup`, {
        email,
        name,
        password,
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) setStatus('회원가입에 성공했습니다!');
      })
      .catch((error: AxiosError) => {
        switch (error.response.status) {
          case 409:
            setStatus(error.response.data);
            break;
          case 412:
            setStatus('데이터가 누락되었습니다.');
            break;
          default:
            setStatus('알 수 없는 오류가 발생했습니다.');
            break;
        }
      });
  };

  return (
    <div>
      <h1>sign up</h1>
      <input type="text" name="email" placeholder="Enter Email" onChange={inputProfile} />
      <br />
      <input type="text" name="name" placeholder="Enter Name" onChange={inputProfile} />
      <br />
      <input type="password" name="password" placeholder="Enter Password" onChange={inputProfile} />
      <br />
      <button type="button" onClick={signUp}>
        Sign Up
      </button>
      <br />
      <div>{status}</div>
      <br />
      <Link href="/signin">
        <a>Go to Login</a>
      </Link>
      <br />
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};

export default SignUp;
