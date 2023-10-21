import Link from 'next/link';
import Social from './Social';
import * as React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-700 fixed w-full top-0 left-0 z-30">
      <nav className="flex justify-between p-4 items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-white text-xl mr-4">Nick Mackowski</a>
          </Link>
          <Social />
        </div>
        <div className="flex">
          <Link href="/subpages/newsletter">
            <a className="text-white text-sm ml-6 transition-all duration-300 hover:font-bold">Newsletter</a>
          </Link>
          {/* <Link href="/blog">
            <a className="text-white text-sm ml-6 transition-all duration-300 hover:font-bold">Blog</a>
          </Link> */}
          <Link href="/">
            <a className="text-white text-sm ml-6 transition-all duration-300 hover:font-bold">About Nick</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
