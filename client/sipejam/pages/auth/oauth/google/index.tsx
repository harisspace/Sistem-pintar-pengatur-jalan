import { google } from "googleapis";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const clientId = "233104507778-v37igv30fgigluejsfbjldk7l9l8lj8u.apps.googleusercontent.com";
  const clientSecret = "98P8LU_JJHUQoFJbc62VVa0Y";
  const redirectUri = "http://localhost:3000/auth/oauth/google/confirmation";

  const url = await new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri,
  }).generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
  });

  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  };
};

export default function GoogleOAuth() {}
