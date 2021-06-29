import { useState } from "react";
import Image from "next/image";
import { MdPlace } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useEffect } from "react";
import slugify from "slugify";
import queryString from "querystring";
import axios from "axios";
import { useRef } from "react";
import { useContext } from "react";
import { JoinContext } from "../context/JoinContext";

interface Props {
  system: any;
  user: any;
}

export const SystemCard: React.FC<Props> = ({ system, user }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [join, setJoin] = useState<string>("");
  const ws = useRef<WebSocket | null>(null);

  const { dispatchJoin }: any = useContext(JoinContext);

  // slug
  const nameSlug = slugify(system.name, "_");
  // querystring
  const systemName = queryString.stringify({ name: nameSlug });

  useEffect(() => {
    if (system.usersystemlinks.length < 1) {
      if (system.users.user_uid == user.user_uid) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      if (system.users.user_uid == user.user_uid) setIsAdmin(true);
      system.usersystemlinks.forEach((user_uid: object) => {
        if (user_uid === user.user_uid) setIsAdmin(true);
      });
    }
  }, []);

  useEffect(() => {
    // if not admin request join system
    if (isAdmin === false) {
      const joinQuery = queryString.stringify({ name: system.name, username: user.username });
      setJoin(joinQuery);
    }
  }, [isAdmin]);

  // func
  const requestJoin = async (e: any) => {
    e.preventDefault();

    dispatchJoin({ type: "REQUEST_JOIN", payload: { username: user.username, system: system.system_uid } });

    try {
      const res = await axios.post(`/system/join/${system.system_uid}?username=${user.username}`);
      if (res) console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid bg-white grid-cols-4 rounded-lg mt-10 w-3/6 m-auto py-5 px-4">
      <div className="mr-5 col-span-1">
        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${system.image_uri}`} height={100} width={100} />
      </div>
      <div className="flex flex-col justify-between col-span-2">
        <div>
          <a href={`/system/${nameSlug}`} className="font-bold uppercase text-xl">
            {system.name}
          </a>
          <span className="flex items-center text-sm text-primary">
            <MdPlace />
            <span className="ml-1">{system.placed}</span>
          </span>
        </div>
        <div className="">
          <span className="flex items-center text-sm text-secondary">
            <RiAdminLine />
            <span className="ml-1">{system.users.username}</span>
          </span>
        </div>
      </div>
      <div className="col-span-1">
        <button className="bg-green-500 text-white w-full py-1 px-6 active:bg-gray-500 font-bold rounded-xl">
          {isAdmin ? <a href="`/dashboard?${systemName}`">Dashboard</a> : <a onClick={requestJoin}>Join</a>}
        </button>
      </div>
    </div>
  );
};
