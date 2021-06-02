import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader";
import classNames from "classnames";

export default function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set loading true
    setLoading(true);

    try {
      const result = await axios.post("/auth/signin", {
        email,
        password,
      });
      if (result) {
        setLoading(false);

        if (result.data.user) {
          router.push(result.data.redirect);
        }
      }
      console.log("result", result);
    } catch (err) {
      console.log(err.response);
      setErrors(err.response.data.errors);
      setLoading(false);
    }
  };

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
            <div className="mt-4">SIGNIN WITH GOOGLE</div>

            <form className="w-11/12 mt-6" onSubmit={handleSubmit}>
              <div className="mb-3 pt-0">
                <input
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className={classNames(
                    "px-3 py-3 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full",
                    { "border border-red-500": errors?.global }
                  )}
                />
              </div>
              <div className="mb-3 pt-0">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className={classNames(
                    "px-3 py-3 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full",
                    { "border border-red-500": errors?.password }
                  )}
                />
              </div>

              {/* list when error occur */}
              {errors?.email || errors?.password || errors?.global ? (
                <div className="p-3 text-sm text-red-500">
                  <ul className="list-outside">
                    <li>{errors.email ? errors.email : ""}</li>
                    <li>{errors.password ? errors.password : ""}</li>
                    <li>{errors.global ? errors.global : ""}</li>
                  </ul>
                </div>
              ) : null}

              {errors?.options ? (
                <div className="p-3 text-sm text-red-500">
                  <span>
                    {errors.options.email.message + " "}
                    <Link href={errors.options.email.redirect}>
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
