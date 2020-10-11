import React, { useEffect } from "react";
import DiscordOAuth2 from "discord-oauth2";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface IQuery {
  code?: ParsedUrlQuery;
}

const callback = () => {
  const router = useRouter();

  const sendToke = async (discord: string) => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/signin`, {
      discord,
    });
  };

  const getToken = async () => {
    const { code }: IQuery = router.query;
    const oauth = new DiscordOAuth2();
    const discord = await oauth.tokenRequest({
      code: code.toString(),
      scope: "identify email",
      clientId: process.env.NEXT_PUBLIC_DISCORD_ID,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_SECRET,
      grantType: "authorization_code",
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    });
    const Storage = window.localStorage;
    Storage.setItem("refreshToken", discord.refresh_token);
    Storage.setItem("accessToken", discord.access_token);
    sendToke(discord.access_token);
    Router.push("/main");
  };
  useEffect(() => {
    getToken();
  }, []);
  return <div></div>;
};

export default callback;
