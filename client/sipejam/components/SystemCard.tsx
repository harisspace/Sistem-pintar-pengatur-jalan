import { useState } from "react";
import Image from "next/image";
import { MdPlace } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useEffect } from "react";
import slugify from "slugify";
import queryString from "querystring";

interface Props {
  system: any;
  user: any;
}

export const SystemCard: React.FC<Props> = ({ system, user }) => {
  const [isAdmin, setIsAdmin] = useState(false);

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
          <a href={isAdmin ? `/dashboard?${systemName}` : "/join"}>{isAdmin ? "Dashboard" : "Join"}</a>
        </button>
      </div>
    </div>
  );
};
