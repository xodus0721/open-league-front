import Link from 'next/link';
import React from 'react';

const Index = () => (
  <div>
    <div>
      <Link href="/signin">Sign In Page</Link>
      <br />
      <Link href="/signup">Sign Up Page</Link>
      <br />
      <Link href="/friends">Friends Page</Link>
    </div>
  </div>
);

export default Index;
