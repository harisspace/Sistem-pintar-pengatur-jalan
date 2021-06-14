import axios from "axios";

interface Signin {
  email: string;
  password: string;
}

interface Signup {
  email: string;
  username: string;
  password: string;
}

export const signin = async ({ email, password }: Signin) => {
  const res = await axios.post("/auth/signin", { email, password });
  const user = res.data.user;
  const redirect = res.data.redirect;
  return { ...user, redirect };
};

export const signup = async ({ email, password, username }: Signup) => {
  const res = await axios.post("/auth/signup", { username, email, password });
  const message = res.data.message;
  return message;
};

export const OAuthData = async (codeQueryString: string) => {
  const res = await axios.get(`/auth/google/confirmation?${codeQueryString}`);
  const user = res.data;
  return user;
};

export const checkCookie = async (token: string) => {
  const res = await axios.get(`/auth/checkCookie`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
