import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "../../components/Loader";

export default function email() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { token } = router.query;

  const fetchResendEmail = async () => {
    try {
      return await axios.get(`/email?token=${token}`);
    } catch (err) {
      return router.push("/signin");
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token]);

  useEffect(() => {
    fetchResendEmail()
      .then((res: any) => {
        console.log(res);
        // if success redirect
        if (res?.data.success) {
          setLoading(false);
          router.push(res?.data.redirect);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, fetchResendEmail]);

  return <>{loading ? <Loader /> : ""}</>;
}
