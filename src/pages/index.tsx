// pages/index.tsx

import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Main Page!</h1>
      <ul>
        <li><Link href="/XO">XO Game</Link></li>
        <li><Link href="/restaurant">Restaurant</Link></li>
        <li><Link href="/uxui">UX/UI</Link></li>
      </ul>
    </div>
  );
};

export default Home;
