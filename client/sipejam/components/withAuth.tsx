import { useRouter } from "next/router";
import cookie from "js-cookie";

export const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== "undefined") {
      const token = cookie.get("token");
      console.log("from server brow", token);

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};
