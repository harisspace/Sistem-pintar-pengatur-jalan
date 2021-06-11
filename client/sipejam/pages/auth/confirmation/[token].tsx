import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader";

export default function Confirmation() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchConfirmation = async (token: any) => {
    try {
      return await axios.get(`/auth/confirmation/${token}`);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    const { token } = router.query;

    if (!token) router.push("/");

    fetchConfirmation(token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [fetchConfirmation]);

  return <>{loading ? <Loader /> : ""}</>;
}
