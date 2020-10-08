import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";

const Login = () => {
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

  const login = async () => {
    await axios
      .post("https://open-league-back.herokuapp.com/api/v1/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.status == 200) setStatus("로그인 되었습니다!");
      })
      .catch((error) => {
        if (error.response.status == 401)
          setStatus("비밀번호가 일치하지 않습니다.");
        else if (error.response.status == 404)
          setStatus("계정이 존재하지 않습니다.");
        else if (error.response.status == 412)
          setStatus("입력란에 공백이 있습니다.");
      });
  };

  return (
    <div>
      <h1>login</h1>
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
      <button onClick={login}>Login</button>
      <div>{status}</div>
      <Link href="/register">Need a sign up?</Link>
    </div>
  );
};

export default Login;
