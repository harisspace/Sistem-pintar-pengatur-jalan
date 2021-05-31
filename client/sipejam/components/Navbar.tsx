export default function Navbar() {
  return (
    <div className="w-full shadow-md sticky top-0 z-10">
      <div className="flex justify-between py-3 w-wrapper m-auto">
        <span>
          <a href="/">
            <h1>LOGO</h1>
          </a>
        </span>
        <div>
          <ul className="flex">
            <li className="mr-8">
              <a href="/">Home</a>
            </li>
            <li className="mr-8">
              <a href="/about">About</a>
            </li>
            <li className="">
              <a href="/signin">Signin</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
