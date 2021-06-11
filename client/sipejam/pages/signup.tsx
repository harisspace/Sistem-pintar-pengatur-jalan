import Head from "next/head";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader";
import classNames from "classnames";
import Link from "next/link";
import { GoogleOAuth } from "../components/GoogleOAuth";
import { Notification } from "../components/Notification";
import { signupStart } from "../store/actions/auth.actions";
import { connect } from "react-redux";

interface Props {
  signupStart: (payload: object) => {};
  loading: boolean;
  message: string;
  error: any;
}

function signup({ signupStart: signupStartProps, message, loading, error }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(message, loading, error);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signupStartProps({ username, email, password });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Head>
        <title>Signup</title>
      </Head>
      {loading ? <Loader /> : null}
      {message ? <Notification message={message} /> : null}
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
                  className={classNames("input", { "border-red-500 border": error?.email })}
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className={classNames("input", { "border-red-500 border": error?.username })}
                  name="username"
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="input"
                  name="password"
                />
              </div>

              {/* list when error occur */}
              {error?.email || error?.username ? (
                <div className="p-3 text-sm text-red-500">
                  <ul className="list-inside">
                    <li>{error.email}</li>
                  </ul>
                </div>
              ) : null}

              <span>
                Sudah punya akun?, klik
                <Link href="/signin">
                  <a className="text-blue-500"> di sini </a>
                </Link>
                untuk login
              </span>
              <input
                type="submit"
                className="mt-3 cursor-pointer block bg-secondary text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              />
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
    message: state.authReducer.message,
    error: state.authReducer.error,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    signupStart: (payload: object) => dispatch(signupStart(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(signup);
