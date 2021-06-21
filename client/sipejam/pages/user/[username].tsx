import { GetServerSideProps } from "next";
import { Card } from "../../components/Card";
import NavbarLeft from "../../components/NavbarLeft";
import { redirectNoAuth } from "../../utils/redirect";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  user: any;
}

const username: React.FC<Props> = ({ user }) => {
  return (
    <div className="grid grid-cols-12">
      <NavbarLeft user={user} />
      <div className="col-span-10 bg-gray-100 min-h-screen">
        <div className="w-wrapper m-auto mt-5">
          <div className="p-4 bg-white rounded-xl shadow-xl">
            <ul>
              <li className="flex flex-col">
                <span className="text-primary">Name</span>
                <span>Haris Akbar</span>
              </li>
              <li className="flex flex-col mt-3">
                <span className="text-primary">Email</span>
                <span>harisakbar04@gmail.com</span>
              </li>
              <li className="flex flex-col mt-3">
                <span className="text-primary">User Role</span>
                <span>user</span>
              </li>
            </ul>
          </div>
          <div className="mt-10 p-4 rounded-xl">
            <h1 className="text-xl text-bg font-bold">Admin System Of</h1>
            <div className="flex mt-5">
              <div className="w-14 h-14 cursor-pointer">
                <img className="rounded-full bg-white max-w-full h-full w-full align-middle border-none shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default username;
