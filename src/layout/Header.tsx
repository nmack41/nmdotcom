import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-700 fixed w-full top-0 left-0 z-30">
      <nav className="flex justify-between p-4 items-center">
        <Link href="/" className="text-white text-xl mr-4">Nick Mackowski</Link>
        <div className="socialclass ml-2">
          {/* Include your Social component here */}
          {/* <Social /> */}
        </div>
        <div className="flex">
          <Link href="/newsletter" className="text-white text-sm ml-6 transition-all duration-300 hover:font-bold">Newsletter</Link>
          <Link href="/blog" className="text-white text-sm ml-6 transition-all duration-300 hover:font-bold">Blog</Link>
          {/* Uncomment below if you want an "About Nick" link */}
          {/* <Link href="/">
            <a className="text-white text-sm ml-6 transition-all duration-300 hover:font-bold">
              About Nick
            </a>
          </Link> */}
        </div>
      </nav>
    </header>
  );
}
