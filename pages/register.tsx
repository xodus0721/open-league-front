import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";

const Register = () => {
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

  const register = async () => {
    await axios.post("https://open-league-back.herokuapp.com/api/v1/auth/signin", {
      name,
      password,
      email,
    });
  };

  return (
    <div>
      <h1>register</h1>
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
      <button onClick={register}>Register</button>
      <Link href="/login">Go to Login?</Link>
    </div>
  );
};

export default Register;
