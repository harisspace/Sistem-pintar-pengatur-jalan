import React from "react";
import { SearchCard } from "./SearchCard";

interface Props {
  systems: any[];
}

export const SearchCardList: React.FC<Props> = ({ systems }) => {
  return (
    <div className="absolute w-full">
      {systems.map((system) => (
        <SearchCard system={system} key={system.id} />
      ))}
    </div>
  );
};
