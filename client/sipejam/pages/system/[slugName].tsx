import { GetServerSideProps } from "next";
import { redirectNoAuth } from "../../utils/redirect";
import Router from "next/router";
import { useEffect } from "react";
import { getSystemStart } from "../../store/actions/system.action";
import { connect } from "react-redux";
import { Loader } from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { MdPlace } from "react-icons/md";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  loading: boolean;
  getSystemStart: (systemName: any) => {};
  system: any;
  authenticated: boolean;
  isSuperAdmin: boolean;
}

const slugName: React.FC<Props> = ({
  authenticated,
  loading,
  system,
  getSystemStart: getSystemStartProps,
  isSuperAdmin,
}) => {
  useEffect(() => {
    const { slugName: systemName } = Router.query;

    getSystemStartProps(systemName);
  }, []);
  console.log(system);

  return (
    <div className="bg-white h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar authenticated={authenticated} isSuperAdmin={isSuperAdmin} />
          <div className=" w-1/2 p-10 m-auto rounded-lg shadow-xl">
            {/* top */}
            <div className="flex items-center mb-8">
              <div className="w-14 h-14">
                <img
                  className="rounded-full bg-white max-w-full h-full w-full align-middle border-none shadow"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${system.users.image_uri}`}
                  alt={system.name}
                />
              </div>
              <div className="ml-10">
                <h1 className="font-bold text-xl">{system.name.toUpperCase()}</h1>
                <span className="text-xs text-primary flex items-center">
                  <i className="inline">
                    <MdPlace />
                  </i>
                  <span>{system.placed}</span>
                </span>
                <span className="text-xs text-primary">
                  Created by {system.users.username} at {system.created_at}
                </span>
              </div>
            </div>

            {/* center */}
            <div className="flex mb-3 justify-center h-64">
              <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${system.image_uri}`} alt={system.name} />
            </div>

            {/* bottom */}
            <div>
              <h2 className="text-lg font-bold">Admin</h2>
              <div className="flex cursor-pointer">
                {system.usersystemlinks.map((admin: any) => (
                  <div className="w-14 h-14" key={admin.id}>
                    <img
                      className="rounded-full bg-white max-w-full h-full w-full align-middle border-none shadow"
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${admin.image_uri}`}
                      alt={admin.username}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.systemReducer.loading,
    system: state.systemReducer.system,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSystemStart: (systemName: string) => dispatch(getSystemStart(systemName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(slugName);
