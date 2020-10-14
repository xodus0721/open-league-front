import axios from 'axios';
import DiscordOAuth2 from 'discord-oauth2';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

interface IQuery {
  code?: ParsedUrlQuery;
}

const Callback = () => {
  const router = useRouter();

  const sendToken = async (discord: string) => {
    const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/auth/signin`, {
      discord,
    });
    Cookies.set('email', result.data.email);
    Cookies.set('name', result.data.name);
  };

  const getToken = async () => {
    const { code }: IQuery = router.query;
    const oauth = new DiscordOAuth2();
    const discord = await oauth.tokenRequest({
      code: code.toString(),
      scope: 'identify email',
      clientId: process.env.NEXT_PUBLIC_DISCORD_ID,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_SECRET,
      grantType: 'authorization_code',
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    });
    Cookies.set('refreshToken', discord.refresh_token);
    Cookies.set('accessToken', discord.access_token);
    sendToken(discord.access_token);
    Router.push('/');
  };
  useEffect(() => {
    getToken();
  }, []);
  return <div />;
};

export default Callback;
