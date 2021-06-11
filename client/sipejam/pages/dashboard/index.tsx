import { Card } from "../../components/Card";
import NavbarLeft from "../../components/NavbarLeft";
import { withAuth } from "../../components/withAuth";

function dashboard() {
  return (
    <div className="grid grid-cols-12">
      <NavbarLeft />
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
}

export default withAuth(dashboard);
