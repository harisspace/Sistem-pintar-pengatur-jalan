import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    notFound: true,
  };
};

const system = () => {
  return null;
};

export default system;
