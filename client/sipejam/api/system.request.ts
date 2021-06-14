import axios from "axios";
import Cookies from "js-cookie";

export const getSystems = async () => {
  const res = await axios.get("/system");

  return res.data.systems;
};

export const findSystems = async (query: string) => {
  const res = await axios.get(`/system/find?${query}`);

  return res;
};
