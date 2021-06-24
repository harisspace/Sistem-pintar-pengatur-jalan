import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import classNames from "classnames";
import Link from "next/link";
import Router from "next/router";
import { AiOutlineHome, AiOutlineProfile, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useRef } from "react";
import { updateUser } from "../api/user.request";
import slugify from "slugify";

interface Props {
  user: any;
  systemName: string;
}

const NavbarLeft: React.FC<Props> = ({ user, systemName }) => {
  // state
  const [path, setPath] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [username, setUsername] = useState<string>(user.username);
  const [profile, setProfile] = useState<any>({});

  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  // slug
  const usernameSlug = slugify(user.username, "_");

  // effect
  useEffect(() => {}, []);

  useEffect(() => {
    let pathUrl: string[] | string = Router.pathname.split("/");
    if (pathUrl.length !== 3) {
      pathUrl = pathUrl[1];
    } else {
      pathUrl = pathUrl[2];
    }
    setPath(pathUrl);
  }, []);

  // function
  const handleUploadProfile = (e: MouseEvent<HTMLImageElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfile(e.target.files[0]);
    }
  };

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    if (profile instanceof File) {
      formData.append("profile", profile as any);
    }

    try {
      const res = await updateUser(user.username, formData);
      if (res) {
        console.log(res);
        setIsChange(false);
        Router.replace("/dashboard", "/dashboard");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <div className="col-span-2">
        <div className="flex flex-col items-center p-6 shadow-sm">
          <div className="flex flex-wrap justify-center">
            <div className="w-20 h-18">
              <img
                onClick={handleUploadProfile}
                src={`http://localhost:4000/images/${user.image_uri}`}
                alt="user profile"
                className={classNames("shadow rounded-full max-w-full h-full w-full align-middle border-none", {
                  "cursor-pointer": isChange,
                })}
              />
              {isChange ? (
                <input type="file" name="image" onChange={handleInputChange} ref={inputRef} className="hidden" />
              ) : (
                ""
              )}
            </div>
          </div>

          {isChange ? (
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" />
          ) : (
            <span>{user.username}</span>
          )}
          <div>
            {isChange ? (
              <>
                <button className="btn" onClick={handleSave}>
                  Save
                </button>
                <button className="btn" onClick={() => setIsChange(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn" onClick={() => setIsChange(true)}>
                Edit profile
              </button>
            )}
          </div>
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
              <Link href={`/user/${usernameSlug}`}>
                <a className="ml-2">Profile</a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "dashboard",
              })}
            >
              <RiDashboardLine />
              <Link href={`/dashboard?name=${systemName}`}>
                <a className="ml-2">Dashboard</a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "graphics",
              })}
            >
              <BsGraphUp />
              <Link href={`/dashboard/graphics?name=${systemName}`}>
                <a className="ml-2">Graphics</a>
              </Link>
            </li>
            <li
              className={classNames("mb-3 flex justify-center items-center", {
                "bg-gray-400": path === "settings",
              })}
            >
              <IoSettingsOutline />

              <Link href={`/dashboard/settings?name=${systemName}`}>
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
