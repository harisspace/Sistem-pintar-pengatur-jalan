import { GetServerSideProps } from "next";
import { redirectNoAuth } from "../../utils/redirect";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSystemStart } from "../../store/actions/system.action";
import { connect } from "react-redux";
import { Loader } from "../../components/Loader";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  loading: boolean;
  systems: any;
  getSystemStart: (systemName: any) => {};
}

const slugName: React.FC<Props> = ({ loading, systems, getSystemStart: getSystemStartProps }) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { slugName: systemName } = router.query;
    console.log(systems, loading);

    getSystemStartProps(systemName);
  }, [router]);

  return <div>{loading ? <Loader /> : <h1>oke</h1>}</div>;
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.systemReducer.loading,
    systems: state.systemReducer.systems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSystemStart: (systemName: string) => dispatch(getSystemStart(systemName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(slugName);
