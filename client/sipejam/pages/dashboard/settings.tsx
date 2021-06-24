import { GetServerSideProps } from "next";
import { connect } from "react-redux";
import NavbarLeft from "../../components/NavbarLeft";
import { redirectNoAuth } from "../../utils/redirect";
import { EventHandler, FormEvent, useState } from "react";
import { updateSystem } from "../../api/system.request";
import { updateSystemStart } from "../../store/actions/system.action";
import { Loader } from "../../components/Loader";
import { useRouter } from "next/router";
import queryString from "querystring";
import { makeText } from "../../utils/makeText";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  user: any;
  system: any;
  updateSystemStart: (systemName: string, formData: any) => {};
  loading: boolean;
}

const settings: React.FC<Props> = ({ user, system, updateSystemStart: updateSystemStartProps, loading }) => {
  // state
  const [status, setStatus] = useState<string | "on" | "off">("on");
  const [systemWork, setSystemWork] = useState<string | "auto" | "manual">("auto");
  const [languange, setLanguange] = useState<string | "idn" | "en">("en");

  // router
  const router = useRouter();
  const { name } = router.query;
  const systemName = makeText(name as string);

  // function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("status", status);
    formData.append("system_work", systemWork);

    updateSystemStartProps(systemName, formData);
  };

  return (
    <div className="grid grid-cols-12">
      <NavbarLeft systemName={name as string} user={user} />
      <div className="col-span-10 bg-gray-100 min-h-screen">
        {loading ? (
          <div className="w-wrapper m-auto mt-5">
            <Loader />
            <div className="bg-white p-7 rounded-xl shadow-xl">
              <h1 className="text-center text-xl font-bold uppercase">Settings</h1>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between">
                  <span className="text-primary">Languange</span>
                  <select name="language" id="language">
                    <option value="idn">Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex justify-between mt-14">
                  <span className="text-primary">Automatic/Manual For System Works</span>
                  <select name="systemWork" id="systemWork">
                    <option value="auto">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <div className="flex justify-between mt-14">
                  <span className="text-primary">Status</span>
                  <select name="status" id="status">
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </div>
                <div className="flex justify-center mt-10 w-full">
                  <button className="btn" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-wrapper m-auto mt-5">
            <div className="bg-white p-7 rounded-xl shadow-xl">
              <h1 className="text-center text-xl font-bold uppercase">Settings</h1>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between">
                  <span className="text-primary">Languange</span>
                  <select name="language" id="language" onChange={(e) => setLanguange(e.target.value)}>
                    <option value="idn">Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex justify-between mt-14">
                  <span className="text-primary">Automatic/Manual For System Works</span>
                  <select name="systemWork" id="systemWork" onChange={(e) => setSystemWork(e.target.value)}>
                    <option selected={system.system_work === "auto" ? true : false} value="auto">
                      Automatic
                    </option>
                    <option selected={system.system_work === "manual" ? true : false} value="manual">
                      Manual
                    </option>
                  </select>
                </div>
                <div className="flex justify-between mt-14">
                  <span className="text-primary">Status</span>
                  <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
                    <option selected={system.statue === "on" ? true : false} value="on">
                      On
                    </option>
                    <option selected={system.status === "off" ? true : false} value="off">
                      Off
                    </option>
                  </select>
                </div>
                <div className="flex justify-center mt-10 w-full">
                  <button className="btn" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    system: state.systemReducer.system,
    loading: state.systemReducer.loading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSystemStart: (systemName: string, formData: any) => dispatch(updateSystemStart(systemName, formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(settings);
