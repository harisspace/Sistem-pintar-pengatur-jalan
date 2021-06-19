import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineProfile, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

interface Props {
  user: any;
}

const NavbarLeft: React.FC<Props> = ({ user }) => {
  const [path, setPath] = useState("");

  const router = useRouter();
  console.log(user);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!router.isReady) return;

    let pathUrl: string[] | string = router.pathname.split("/");
    if (pathUrl.length !== 3) {
      pathUrl = pathUrl[1];
    } else {
      pathUrl = pathUrl[2];
    }
    console.log(pathUrl);

    setPath(pathUrl);
  }, [router]);

  return (
    <>
      <div className="col-span-2">
        <div className="flex flex-col items-center p-6 shadow-sm">
          <div className="flex flex-wrap justify-center">
            <div className="w-20 h-18">
              <img
                src={`http://localhost:4000/images/${user.image_uri}`}
                alt="user profile"
                className="shadow rounded-full max-w-full h-full w-full align-middle border-none"
              />
            </div>
          </div>
          <span>{user.username}</span>
        </div>

        <div className="flex flex-col mt-8">
          <ul className="w-full text-center">
            <li className={classNames("mb-3 flex justify-center items-center", { "bg-gray-400": path === "/" })}>
              <AiOutlineHome />
              <Link href="/">
                <a className="ml-2">Home</a>
              </Link>
            </li>
            <li className={classNames("mb-3 flex justify-center items-center", { "bg-gray-400": path === "/" })}>
              <AiOutlineProfile />
              <Link href="/:username">
                <a className="ml-2">Profile</a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "dashboard",
              })}
            >
              <RiDashboardLine />
              <Link href="/dashboard">
                <a className="ml-2">Dashboard</a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "graphics",
              })}
            >
              <BsGraphUp />
              <Link href="/dashboard/graphics">
                <a className="ml-2">Graphics</a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "settings",
              })}
            >
              <IoSettingsOutline />

              <Link href="/dashboard/settings">
                <a className="ml-2">Settings</a>
              </Link>
            </li>
            <li className="mb-3 flex justify-center items-center">
              <AiOutlineLogout />
              <Link href="/signout">
                <a className="ml-2">Signout</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarLeft;
