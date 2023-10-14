// NavBar.tsx
import { useRouter } from 'next/router';
import * as React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className="text-xl">Nick Mackowski</a>
        </Link>
        <div className="socialClass ml-2">
          {/* Insert Social component */}
        </div>
        <div className="flex">
          <Link href="/newsletter">
            <a className={styles.link}>Newsletter</a>
          </Link>
          <Link href="/blog">
            <a className={styles.link}>Blog</a>
          </Link>
          {/* Uncomment below to include 'About Nick' link */}
          {/*
          <Link href="/">
            <a className={styles.link}>About Nick</a>
          </Link>
          */}
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
