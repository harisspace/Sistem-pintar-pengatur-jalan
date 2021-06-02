import { GetServerSideProps } from "next";
import Router from "next/router";

export default function OAuth() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // redirect from the browser
  if (typeof window !== "undefined") {
    Router.replace("/", "/");
  } else {
    // redirect from server side
    ctx.res.writeHead(302, { Location: "/" }).end();
  }

  return {
    props: {},
  };
};
