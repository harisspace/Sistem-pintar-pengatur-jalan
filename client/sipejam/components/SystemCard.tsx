import { useState } from "react";
import Image from "next/image";
import { MdPlace } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useEffect } from "react";

interface Props {
  system: any;
  user: any;
}

export const SystemCard: React.FC<Props> = ({ system, user }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (system.usersystemlinks.length < 1) {
      setIsAdmin(false);
    } else {
      if (system.users.user_uid === user.user_uid) setIsAdmin(true);
      system.usersystemlinks.forEach((user_uid: object) => {
        if (user_uid === user.user_uid) setIsAdmin(true);
      });
    }
  }, []);

  return (
    <div className="flex bg-white justify-evenly rounded-lg mt-10 w-2/5 m-auto py-5 px-4">
      <div className="mr-5">
        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${system.image_uri}`} height={100} width={100} />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <a href={`/system/${system.name}`} className="font-bold uppercase text-xl">
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
      <div>
        <button className="bg-green-500 text-white py-1 px-6 active:bg-gray-500 font-bold rounded-xl">
          <a href={isAdmin ? "/dashboard" : "/join"}>{isAdmin ? "Dashboard" : "Join"}</a>
        </button>
      </div>
    </div>
  );
};
