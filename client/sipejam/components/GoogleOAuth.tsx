import { useRouter } from "next/router";

export const GoogleOAuth = () => {
  const router = useRouter();

  const path = router.pathname.split("/")[1];

  return (
    <div className="bg-blue-500  w-8/12 rounded-sm shadow-lg cursor-pointer">
      <a href="/auth/oauth/google" className="p-1 flex items-center">
        <div className="p-1 bg-white">
          <img src="/images/google.png" alt="google" className="bg-contain" width={30} height={30} />
        </div>
        <span className="text-white ml-4 font-bold text-md tracking-normal">
          Sign {path === "signin" ? "In" : "Up"} with google
        </span>
      </a>
    </div>
  );
};
