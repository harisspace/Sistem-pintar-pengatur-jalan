import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import NavbarLeft from "../../components/NavbarLeft";
import { redirectNoAuth } from "../../utils/redirect";
import { useRouter } from "next/router";
import { makeText } from "../../utils/makeText";
import { getSystemStart } from "../../store/actions/system.action";
import { connect } from "react-redux";
import { Loader } from "../../components/Loader";
import { Notification } from "../../components/Notification";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  user: any;
  getSystemStart: (systemName: string) => {};
  loading: boolean;
  system: any;
  error: any;
}

const dashboard: React.FC<Props> = ({ user, getSystemStart: getSystemStartProps, loading, system, error }) => {
  // state
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  // querystring
  const router = useRouter();
  let { name } = router.query;
  if (!name) router.push("/");
  if (error) {
    setTimeout(() => {
      router.push("/");
    }, 3000);
    return <Notification message={error?.data.message} />;
  }
  const pathName = makeText(name as string);

  // effect
  useEffect(() => {
    getSystemStartProps(pathName as string);
  }, []);

  useEffect(() => {
    if (Object.keys(system > 1)) {
      if (user.user_role !== "superadmin") {
        if (system.usersystemlinks.length > 1) {
          system.usersystemlinks.forEach((userAdmin: any) => {
            if (userAdmin.user_uid === user.user_uid) {
              setIsAllowed(true);
            }
          });
        }
      } else {
        setIsAllowed(true);
      }
    }
  }, [system]);

  return (
    <div className="grid grid-cols-12">
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAllowed ? (
            <>
              <NavbarLeft user={user} systemName={name as string} />
              <div className="col-span-10 bg-gray-100 min-h-screen">
                <div className="w-wrapper m-auto mt-5">
                  <h1 className="text-center uppercase">{pathName}</h1>
                  <div className="flex">
                    <Card title="Kecepatan" />
                    <Card title="Kecepatan" />
                    <Card title="Kecepatan" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    system: state.systemReducer.system,
    loading: state.systemReducer.loading,
    error: state.systemReducer.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSystemStart: (systemName: string) => dispatch(getSystemStart(systemName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dashboard);
