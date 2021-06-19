import axios from "axios";

export const getSystems = async () => {
  const res = await axios.get("/system");

  return res.data.systems;
};

export const findSystems = async (query: string) => {
  const res = await axios.get(`/system/find?${query}`);

  return res;
};

export const getSystem = async (systemName: string) => {
  const res = await axios.get(`/system/${systemName}`);

  return res.data;
};

export const createSystem = async (formData: object) => {
  const res = await axios.post("/system", formData, { headers: { "Content-Type": "multipart/form-data" } });

  return res.data;
};
