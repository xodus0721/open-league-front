import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";

const SignUp = () => {
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
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/signup`, {
      name,
      password,
      email,
    });
  };

  return (
    <div>
      <h1>sign up</h1>
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
      <input
        type="text"
        name="email"
        placeholder="Enter Email"
        onChange={inputProfile}
      />
      <br />
      <button onClick={signUp}>Sign Up</button>
      <br />
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
