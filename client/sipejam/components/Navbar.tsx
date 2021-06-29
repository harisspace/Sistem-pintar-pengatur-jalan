import Link from "next/link";
import { ChangeEvent, MouseEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import queryString from "querystring";
import { findSystems } from "../api/system.request";
import { useState } from "react";
import { SearchCardList } from "./SearchCardList";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useRef } from "react";
import axios from "axios";
import { Loader } from "./Loader";

interface Props {
  authenticated: boolean;
  isSuperAdmin: boolean;
  notifications?: any;
}

const Navbar: React.FC<Props> = ({ authenticated, isSuperAdmin, notifications }) => {
  const [error, setError] = useState<string | null>(null);
  const [systems, setSystems] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isFinding, setIsFinding] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [notifData, setNotifData] = useState<any[]>([]);

  const notifRef = useRef(null);

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

  const showNotif = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsClick(!isClick);
    if (isClick === false) {
      setLoading(true);
      try {
        const notificationsData = await axios.get("/user/notification");
        if (notificationsData.data) {
          setLoading(false);
          setNotifData(notificationsData.data);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center py-3 w-wrapper m-auto">
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
              <a href="/" className="mr-8 flex justify-center flex-col items-center text-secondary">
                <i className="text-2xl">
                  <AiOutlineHome />
                </i>
                <span className="text-xs">Home</span>
              </a>
              {isSuperAdmin ? (
                <a href="/system/create" className="mr-8 flex justify-center flex-col items-center text-secondary">
                  <i className="text-2xl">
                    <IoAdd />
                  </i>
                  <span className="text-xs">Create System</span>
                </a>
              ) : (
                ""
              )}
              <a
                onClick={showNotif}
                className="cursor-pointer relative mr-8 flex justify-center flex-col items-center text-secondary"
              >
                <i className="text-2xl relative">
                  <IoIosNotificationsOutline />
                  {notifications > 1 ? (
                    <span className="absolute top-0 text-xs w-3 h-3 bg-red-500 text-black">{notifications}</span>
                  ) : (
                    ""
                  )}
                </i>

                <span className="text-xs">Notifications</span>
                {/* dropdown notif */}
                {isClick ? (
                  <div className="absolute top-12 px-4 py-2 rounded-xl overflow-y-scroll max-h-64 bg-white">
                    <div>
                      {loading ? (
                        <Loader />
                      ) : (
                        notifData.map((data) => (
                          <div className="flex text-xs border-b justify-between border-gray-500" key={data.id}>
                            <div className="flex flex-col">
                              <span className="uppercase">{data.title}</span>
                              <span>{data.message}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <button className="cursor-pointer block bg-secondary text-white font-semibold text-xs px-1 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Accept
                              </button>
                              <button className="cursor-pointer block bg-secondary text-white font-semibold text-xs px-1 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Decline
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </a>
              <a href="/signout" className="mr-8 flex justify-center flex-col items-center text-secondary">
                <i className="text-2xl">
                  <AiOutlineLogout />
                </i>
                <span className="text-xs">Signout</span>
              </a>
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
