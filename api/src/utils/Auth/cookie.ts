import cookie from "cookie";

const cookieOptions: any = {
  path: "/",
  maxAge: 604800,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};

export function serializeCookie(name: string, value: string) {
  return cookie.serialize(name, value, cookieOptions);
}
