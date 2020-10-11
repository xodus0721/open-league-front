import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";
import Link from "next/link";

const SignUp = () => {
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    password: "",
    email: "",
  });

  const { name, password, email } = profile;

  const inputProfile = (e) => {
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
        if (response.status == 200) setStatus("회원가입에 성공했습니다!");
      })
      .catch((error: AxiosError) => {
        switch (error.response.status) {
          case 409:
            setStatus(error.response.data);
            break;
          case 412:
            setStatus("입력란에 공백이 있습니다.");
            break;
          case 500:
            setStatus("알 수 없는 에러가 발생했습니다.");
            break;
        }
      });
  };

  return (
    <div>
      <h1>sign up</h1>
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        onChange={inputProfile}
      />
      <br />
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        onChange={inputProfile}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={inputProfile}
      />
      <br />
      <button onClick={signUp}>Sign Up</button>
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
