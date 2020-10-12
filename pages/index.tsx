import React, { useState, useEffect } from "react";
import Link from "next/link";

const Index = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  return (
    <div>
      <div>
        {accessToken != null ? (
          <Link href="/logout">Log out</Link>
        ) : (
          <Link href="/signin">Sign In Page</Link>
        )}
        <br />
        <Link href="/signup">Sign Up Page</Link>
        <br />
        <Link href="/friends">Friends Page</Link>
      </div>
    </div>
  );
};

export default Index;
