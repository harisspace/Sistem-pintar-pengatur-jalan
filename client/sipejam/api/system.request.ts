import axios from "axios";

export const getSystems = async (token: string) => {
  const res = await axios.get("/system", {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  return res.data.systems;
};

export const findSystems = async (query: string) => {
  const res = await axios.get(`/system/find?${query}`).catch((err) => err);
  if (res instanceof Error) return res;
  // console.log(res.data);

  return res.data.systems;
};
