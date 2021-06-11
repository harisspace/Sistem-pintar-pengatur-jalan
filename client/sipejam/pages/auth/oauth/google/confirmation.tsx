import axios from "axios";
import queryString from "querystring";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "../../../../components/Loader";
import { connect } from "react-redux";
import { OAuthStart } from "../../../../store/actions/auth.actions";

interface Props {
  OAuthStart: (codeQueryString: string) => {};
  error: any;
  authenticated: boolean;
  loading: boolean;
}

function Confirmation({ OAuthStart: OAuthStartProps, error, loading, authenticated }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { code } = router.query;

    if (!code) router.push("/");

    const setCodeQueryString = queryString.stringify({ code });
    console.log(setCodeQueryString);

    // when get code send code to backend

    OAuthStartProps(setCodeQueryString);

    if (error) router.push("/signin");

    if (authenticated) router.push("/dashboard");
  }, [router, loading, authenticated]);

  return <div>{loading ? <Loader /> : ""}</div>;
}

const mapStateToProps = (state: any) => {
  return {
    error: state.authReducer.error,
    authenticated: state.authReducer.authenticated,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    OAuthStart: (codeQueryString: string) => dispatch(OAuthStart(codeQueryString)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
