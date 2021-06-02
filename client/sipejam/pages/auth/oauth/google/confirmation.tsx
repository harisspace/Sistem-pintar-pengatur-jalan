import { GetServerSideProps } from "next";
import axios from "axios";
import queryString from "querystring";

export default function Confirmation() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.req.url, ctx.query);
  const { code } = ctx.query;
  console.log(code);

  if (!code) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const setCodeQueryString = queryString.stringify({ code });
  console.log(setCodeQueryString);

  // when get token send token to backend
  await axios
    .get(`/auth/google/confirmation?${setCodeQueryString}`)
    .then((res) => {
      // do somestuff here
      console.log(res.data); // e.g (data user)
    })
    .catch((err) => {
      console.log(err.response);
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    });

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
