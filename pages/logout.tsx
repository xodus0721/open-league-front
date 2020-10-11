import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";

const logout = () => {
  const revokeToken = async () => {
    const Storage = window.localStorage;
    try {
      await axios.post(
        `${
          process.env.NEXT_PUBLIC_BACKEND
        }/api/v1/auth/revoke/${Storage.getItem("accessToken")}`
      );
      await axios.post(
        `${
          process.env.NEXT_PUBLIC_BACKEND
        }/api/v1/auth/revoke/${Storage.getItem("refreshToken")}`
      );
      Storage.removeItem("accessToken");
      Storage.removeItem("refreshToken");
    } finally {
      Router.push("/main");
    }
  };
  useEffect(() => {
    revokeToken();
  }, []);
  return <div></div>;
};

export default logout;
