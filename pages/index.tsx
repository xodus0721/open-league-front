import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [accessToken, setAccessToken] = useState(null);

  const [UserInfo, setUserInfo] = useState({
    name: Cookies.get('name') !== null ? Cookies.get('name') : '',
    tag: Cookies.get('tag') !== null ? Cookies.get('tag') : '',
  });

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      setAccessToken(localStorage.getItem('accessToken'));
    }
  }, []);

  return (
    <div>
      <div>
        {accessToken ? (
          <div>
            <div>
              <span>{UserInfo.name}</span>
              <span>{UserInfo.tag}</span>
            </div>
            <Link href="/logout">Log out</Link>
          </div>
        ) : (
          <div>
            <Link href="/signin">Sign In Page</Link>
          </div>
        )}
        <Link href="/signup">Sign Up Page</Link>
        <br />
        <Link href="/friends">Friends Page</Link>
      </div>
      <br />
    </div>
  );
};

export default Index;
