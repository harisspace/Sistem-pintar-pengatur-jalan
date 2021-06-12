import Link from "next/link";
import { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { connect } from "react-redux";
import queryString from "querystring";
import { findSystems } from "../api/system.request";
import { useState } from "react";

interface Props {
  authenticated: boolean;
}

const Navbar: React.FC<Props> = ({ authenticated }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const query = queryString.stringify({ name: value });
    console.log(value, query);
    const res = await findSystems(query);

    if (res instanceof Error) setError(res.message);
    if (res) setError(null);
    console.log(res);
  };

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
          <div className="relative flex">
            <span className="z-10 h-full items-center justify-center absolute flex px-2">
              <AiOutlineSearch />
            </span>
            <input type="text" placeholder="Find system" className="search" onChange={handleChange} />
          </div>
        </div>
        <div>
          {authenticated ? (
            <ul className="flex">
              <li className="mr-8">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="mr-8">
                <Link href="/about">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li className="">
                <Link href="/signout">
                  <a>signout</a>
                </Link>
              </li>
            </ul>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    authenticated: state.authReducer.authenticated,
  };
};

export default connect(mapStateToProps)(Navbar);
