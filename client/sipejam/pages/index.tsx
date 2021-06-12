import Head from "next/head";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const unauthRedirect = {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };

  const { token, oauth_token } = nookies.get(ctx);

  if (!token && !oauth_token) {
    console.log("in");

    return unauthRedirect;
  }

  const res = await axios
    .get("/auth/checkCookie", { headers: { Authorization: `Bearer ${token || oauth_token}` } })
    .catch((err) => err);
  if (res instanceof Error) return unauthRedirect;
  if (!res) return unauthRedirect;

  return {
    props: {
      result: res.data,
    },
  };
};

interface Props {
  result: object;
}

const Home: React.FC<Props> = ({ result }) => {
  console.log(result);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className="bg-gradient-to-b from-primary via-secondary">
        <Navbar />

        {result ? (
          <h1>authenticated</h1>
        ) : (
          <>
            <div className="mt-20">
              <h1 className="text-center text-6xl font-bold tracking-tighter mb-2">
                Sistem Pintar Pengatur Jalan
              </h1>
              <h1 className="text-center text-3xl font-medium text-secondary">Berbasis Computer Vision dan IoT</h1>
              <div className="items-center bg-all-system bg-cover h-96 w-7/12 m-auto"></div>
            </div>

            <div>
              <h2 className="text-center text-4xl mb-5 mt-48 font-semibold">Our Services</h2>
              <div className="flex justify-center flex-col items-center">
                <Image src="/images/realtime-monitoring.png" width={100} height={100} layout="fixed" />
                <span className="block text-primary">Realtime Monitoring</span>
              </div>

              <div className="w-8/12 m-auto">
                <div className="flex flex-row justify-between mt-20">
                  <div className="flex justify-center flex-col items-center">
                    <Image src="/images/kecepatan.png" width={130} height={100} className="block" />
                    <span className="text-primary">Speed Detection</span>
                  </div>

                  <div className="flex justify-center flex-col items-center">
                    <Image src="/images/safety.png" width={120} height={100} className="block" />
                    <span className="text-primary">Safety</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
