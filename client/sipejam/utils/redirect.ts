import nookies from "nookies";
import { checkCookie } from "../api/auth.request";

export const redirectWithAuth = async (ctx: any) => {
  let res: any;

  const redirect = {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };

  const allowed = {
    props: {},
  };

  const { token, oauth_token } = nookies.get(ctx);

  if (!token && !oauth_token) {
    return allowed;
  }

  try {
    res = await checkCookie(token || oauth_token);
    if (!res) return allowed;
  } catch (err) {
    console.log(err);
    return allowed;
  }

  return redirect;
};

export const redirectNoAuth = async (ctx: any) => {
  let res: any;

  const redirect = {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };

  const { token, oauth_token } = nookies.get(ctx);

  if (!token && !oauth_token) {
    return redirect;
  }

  try {
    res = await checkCookie(token || oauth_token);
    if (!res) return redirect;
  } catch (err) {
    console.log(err);
    return redirect;
  }

  return {
    props: {
      user: res.user,
      authenticated: true,
      isSuperAdmin: res.user.user_role == "superadmin" ? true : false,
    },
  };
};
