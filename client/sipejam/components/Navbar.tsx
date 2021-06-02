import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full shadow-md sticky top-0 z-10">
      <div className="flex justify-between py-3 w-wrapper m-auto">
        <span>
          <Link href="/">
            <a>
              <h1>LOGO</h1>
            </a>
          </Link>
        </span>
        <div>
          <ul className="flex">
            <li className="mr-8">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="mr-8">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className="">
              <Link href="/signin">
                <a>Signin</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
