import nookies from "nookies";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  nookies.destroy(ctx, "token");
  nookies.destroy(ctx, "oauth_token");

  return {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };
};

export default function signout() {
  return null;
}
