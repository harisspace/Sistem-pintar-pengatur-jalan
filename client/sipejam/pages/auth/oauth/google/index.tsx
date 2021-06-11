import { google } from "googleapis";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URL;

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
