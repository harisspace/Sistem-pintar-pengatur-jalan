import axios from "axios";

export const updateUser = async (username: string, formData: any) => {
  const res = await axios.patch(`/user/${username}`, formData);
  return res.data;
};
