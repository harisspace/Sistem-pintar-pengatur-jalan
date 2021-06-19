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

const dashboard: React.FC<Props> = ({ user }) => {
  return (
    <div className="grid grid-cols-12">
      <NavbarLeft user={user} />
      <div className="col-span-10 bg-gray-100 min-h-screen">
        <div className="w-wrapper m-auto mt-5">
          <div className="flex">
            <Card title="Kecepatan" />
            <Card title="Kecepatan" />
            <Card title="Kecepatan" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
