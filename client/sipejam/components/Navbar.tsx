import Link from "next/link";
import { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import queryString from "querystring";
import { findSystems } from "../api/system.request";
import { useState } from "react";
import { SearchCardList } from "./SearchCardList";

interface Props {
  authenticated: boolean;
}

const Navbar: React.FC<Props> = ({ authenticated }) => {
  const [error, setError] = useState<string | null>(null);
  const [systems, setSystems] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isFinding, setIsFinding] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") return setIsFinding(false);

    console.log(value);
    setIsFinding(true);
    const query = queryString.stringify({ name: value });

    try {
      const systems = await findSystems(query).finally(() => setLoading(false));
      if (systems) setSystems(systems.data.systems);
    } catch (err) {
      setSystems([]);
    }
  };

  console.log(systems, error, loading);

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
        {authenticated ? (
          <div className="relative">
            <div className="relative flex">
              <span className="z-10 h-full items-center justify-center absolute flex px-2">
                <AiOutlineSearch />
              </span>
              <input type="text" placeholder="Find system" className="search" onChange={handleChange} />
            </div>
            {isFinding ? (
              systems.length < 1 ? (
                <div className="absolute bg-white px-2 py-3">
                  <span className="text-center">There's no match system</span>
                </div>
              ) : (
                <SearchCardList systems={systems} />
              )
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
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
                <a href="/signout">Signout</a>
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

export default Navbar;
