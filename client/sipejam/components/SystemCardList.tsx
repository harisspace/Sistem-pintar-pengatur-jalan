import React from "react";
import { SystemCard } from "./SystemCard";

interface Props {
  systems: any;
  user: any;
}

export const SystemCardList: React.FC<Props> = ({ systems, user }) => {
  console.log(systems);

  return (
    <div className="min-h-screen">
      {systems.map((system: any) => (
        <SystemCard system={system} user={user} key={system.id} />
      ))}
    </div>
  );
};
