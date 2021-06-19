import Head from "next/head";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { SystemCardList } from "../components/SystemCardList";
import { checkCookie } from "../api/auth.request";
import { useEffect } from "react";
import { getSystemsStart } from "../store/actions/system.action";
import { connect } from "react-redux";
import { Loader } from "../components/Loader";
import { redirectNoAuth } from "../utils/redirect";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  authenticated: boolean;
  user: any;
  systems: object[];
  getSystemsStart: () => {};
  error: any;
  loading: boolean;
  isSuperAdmin: boolean;
}

const Home: React.FC<Props> = ({
  authenticated,
  user,
  systems,
  getSystemsStart: getSystemsStartProps,
  loading,
  error,
  isSuperAdmin,
}) => {
  useEffect(() => {
    getSystemsStartProps();
  }, []);

  console.log(loading);

  const getData = loading ? <Loader /> : <SystemCardList systems={systems} user={user} />;

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className="bg-gradient-to-b from-primary via-secondary">
        <Navbar authenticated={authenticated} isSuperAdmin={isSuperAdmin} />

        {authenticated ? (
          getData
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

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    systems: state.systemsReducer.systems,
    loading: state.systemsReducer.loading,
    error: state.systemsReducer.error,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getSystemsStart: () => dispatch(getSystemsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
