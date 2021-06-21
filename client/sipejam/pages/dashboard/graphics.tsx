import { useState } from "react";
import { GetServerSideProps } from "next";
import NavbarLeft from "../../components/NavbarLeft";
import { redirectNoAuth } from "../../utils/redirect";
import Chart from "react-apexcharts";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  user: any;
}

const graphics: React.FC<Props> = ({ user }) => {
  // state
  const [options, setOptions] = useState<object>({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });

  const [series, setSeries] = useState<any>([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  return (
    <div className="grid grid-cols-12">
      <NavbarLeft user={user} />
      <div className="col-span-10 bg-gray-100 min-h-screen">
        <div className="w-wrapper m-auto mt-5">
          <div className="p-4 bg-white shadow-xl rounded-xl">
            <h1>Car Detected</h1>
            <Chart options={options} series={series} type="bar" width="500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default graphics;
