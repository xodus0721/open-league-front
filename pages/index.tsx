import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [accessToken, setAccessToken] = useState(null);

  const [UserName, setUserName] = useState('');

  useEffect(() => {
    if (Cookies.get('accessToken') !== null && Cookies.get('name') !== null) {
      setUserName(Cookies.get('name'));
      setAccessToken(Cookies.get('accessToken'));
    }
  }, []);

  return (
    <div>
      <div>
        {accessToken ? (
          <div>
            <Link href="/logout">Log out</Link>
            <br />
            <Link href="/friends">Friends Page</Link>
            <div>
              <span>Profile: </span>
              <span>{UserName}</span>
            </div>
          </div>
        ) : (
          <div>
            <Link href="/signin">Sign In Page</Link>
            <br />
            <Link href="/signup">Sign Up Page</Link>
          </div>
        )}
      </div>
      <br />
    </div>
  );
};

export default Index;
