import Link from "next/link";
import { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { connect } from "react-redux";

interface Props {
  authenticated: boolean;
}

const Navbar: React.FC<Props> = ({ authenticated }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
