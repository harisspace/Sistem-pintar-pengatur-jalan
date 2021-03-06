import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Loader } from "../components/Loader";
import classNames from "classnames";
import { GoogleOAuth } from "../components/GoogleOAuth";
import { Notification } from "../components/Notification";
import { connect } from "react-redux";
import { signinStart } from "../store/actions/auth.actions";
import { GetServerSideProps } from "next";
import { redirectWithAuth } from "../utils/redirect";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectWithAuth(ctx);
};

interface Props {
  user: object;
  signinStart: (emailAndPassword: object) => {};
  loading: boolean;
  error: any;
  authenticated: boolean;
}

function signin({ loading, signinStart: signinStartProps, error, authenticated }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signinStartProps({ email, password });
  };

  useEffect(() => {
    if (authenticated) router.push("/");
  }, [authenticated]);

  return (
    <div>
      <Head>
        <title>Signin</title>
      </Head>
      {loading ? <Loader /> : null}
      <div className="grid grid-cols-8 max-h-screen h-screen">
        <div className="col-span-2 bg-gradient-to-l from-primary to-secondary">
          <div className="bg-sistem h-screen bg-contain bg-no-repeat bg-center"></div>
        </div>

        <div className="col-span-6 flex items-center">
          <div className="ml-3 p-8 w-6/12 shadow-lg">
            <h1>LOGO</h1>
            <GoogleOAuth />

            <form className="w-11/12 mt-6" onSubmit={handleSubmit}>
              <div className="mb-3 pt-0">
                <input
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className={classNames("input", { "border border-red-500": error?.global })}
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className={classNames(
                    "px-3 py-3 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full",
                    { "border border-red-500": error?.password }
                  )}
                />
              </div>

              {/* list when error occur */}
              {error?.email || error?.password || error?.global ? (
                <div className="p-3 text-sm text-red-500">
                  <ul className="list-outside">
                    <li>{error.email ? error.email : ""}</li>
                    <li>{error.password ? error.password : ""}</li>
                    <li>{error.global ? error.global : ""}</li>
                  </ul>
                </div>
              ) : null}

              {error?.options ? (
                <div className="p-3 text-sm text-red-500">
                  <span>
                    {error.options.email.message + " "}
                    <Link href={error.options.email.redirect}>
                      <a className="text-blue-500">di sini</a>
                    </Link>
                  </span>
                </div>
              ) : (
                ""
              )}

              <span>
                Belum punya akun?, klik
                <Link href="/signup">
                  <a className="text-blue-500"> di sini </a>
                </Link>
                untuk register
              </span>
              <input type="submit" className="btn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    authenticated: state.authReducer.authenticated,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    signinStart: (payload: any) => dispatch(signinStart(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(signin);
