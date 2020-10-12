import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";
import Link from "next/link";

const SignIn = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");

  const { email, password } = account;

  const inputAccount = (e) => {
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
        if (response.status == 200) setStatus("로그인 되었습니다!");
      })
      .catch((error: AxiosError) => {
        switch (error.response.status) {
          case 401:
            setStatus("비밀번호가 일치하지 않습니다.");
            break;
          case 404:
            setStatus("계정이 존재하지 않습니다.");
            break;
          case 412:
            setStatus("입력란에 공백이 있습니다.");
            break;
        }
      });
  };

  const authorizationCodegrant = async () => {
    window.open(
      `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=identify%20email`,
      "_blank"
    );
    /*
     * accessToken
     * refreshToken
     */
  };

  return (
    <div>
      <h1>sign in</h1>
      <input
        type="text"
        name="email"
        placeholder="Enter email"
        onChange={inputAccount}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={inputAccount}
      />
      <br />
      <button onClick={signIn}>Sign In</button>
      <div>{status}</div>
      <br />
      <h1>discord sign in</h1>
      <button onClick={authorizationCodegrant}>Discord Sign In</button>
      <br />
      <br />
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
