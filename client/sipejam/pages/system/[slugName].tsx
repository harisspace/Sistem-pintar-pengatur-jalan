import { GetServerSideProps } from "next";
import { redirectNoAuth } from "../../utils/redirect";
import Router, { useRouter } from "next/router";
import { useEffect, useState, MouseEvent, useRef } from "react";
import { getSystemStart } from "../../store/actions/system.action";
import { connect } from "react-redux";
import { Loader } from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { MdPlace } from "react-icons/md";
import { updateSystem, deleteSystem } from "../../api/system.request";
import slugify from "slugify";
import { ChangeEvent } from "react";
import classNames from "classnames";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  loading: boolean;
  getSystemStart: (systemName: any) => {};
  system: any;
  authenticated: boolean;
  isSuperAdmin: boolean;
  user: any;
}

const slugName: React.FC<Props> = ({
  authenticated,
  loading,
  system,
  getSystemStart: getSystemStartProps,
  isSuperAdmin,
  user,
}) => {
  // state
  const [isUserCreatedSystem, setIsUserCreatedSystem] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [placed, setPlaced] = useState("");
  const [image, setImage] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // route
  const router = useRouter();
  const { slugName: systemName } = router.query;

  // effect
  useEffect(() => {
    if (system) {
      setName(system.name);
      setPlaced(system.placed);
      if (user.user_uid === system.users.user_uid) setIsUserCreatedSystem(true);
    }
  }, [system]);

  useEffect(() => {
    getSystemStartProps(systemName);
  }, []);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsChange(true);
  };

  const uploadImage = (e: MouseEvent<HTMLImageElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", image);
    console.log(image, Object.keys(image).length);
    formData.append("name", name);
    formData.append("placed", placed);

    try {
      const res = await updateSystem(systemName as string, formData);
      if (res) {
        setIsChange(false);
        const systemNameSlug = slugify(name);
        Router.replace(`/system/${systemName}`, `/system/${systemNameSlug}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSystem = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await deleteSystem(systemName as string);
      if (res) Router.replace(`/system/${systemName}`, "/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar authenticated={authenticated} isSuperAdmin={isSuperAdmin} />
          <div className=" w-1/2 p-10 m-auto rounded-lg shadow-xl">
            {/* top */}
            <div className="flex items-center mb-8">
              <div className="w-14 h-14">
                <img
                  className="rounded-full bg-white max-w-full h-full w-full align-middle border-none shadow"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${system.users.image_uri}`}
                  alt={system.name}
                />
              </div>
              <div className="ml-10">
                {!isChange ? (
                  <h1 className="font-bold text-xl">{name.toUpperCase()}</h1>
                ) : (
                  <div className="flex flex-col">
                    <input
                      className="input"
                      type="text"
                      value={name}
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <span className="text-xs text-primary flex items-center">
                  {!isChange ? (
                    <>
                      <i className="inline">
                        <MdPlace />
                      </i>
                      <span>{placed}</span>
                    </>
                  ) : (
                    <div className="flex text-xs items-center text-black mt-4">
                      <i className="inline text-xl text-primary">
                        <MdPlace />
                      </i>
                      <input
                        className="px-1 py-1 relative bg-white rounded text-xs border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        type="text"
                        value={placed}
                        id="placed"
                        onChange={(e) => setPlaced(e.target.value)}
                      />
                    </div>
                  )}
                </span>
                {!isChange ? (
                  <span className="text-xs text-primary">
                    Created by {system.users.username} at {system.created_at}
                  </span>
                ) : (
                  ""
                )}
              </div>
              {isUserCreatedSystem ? (
                isChange ? (
                  <div className="ml-10">
                    <button className="btn" onClick={handleSave}>
                      Save
                    </button>
                    <button className="btn" onClick={() => setIsChange(false)}>
                      Cancel
                    </button>
                    <input type="file" ref={fileInputRef} onChange={inputChange} className="hidden" />
                  </div>
                ) : (
                  <div className="ml-10">
                    <button className="btn" onClick={handleClick}>
                      Edit system
                    </button>
                    <button className="btn" onClick={handleDeleteSystem}>
                      Delete system
                    </button>
                  </div>
                )
              ) : (
                ""
              )}
            </div>

            {/* center */}
            <div className="flex mb-3 justify-center h-64">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${system.image_uri}`}
                className={classNames({ "cursor-pointer": isChange })}
                alt={system.name}
                onClick={uploadImage}
              />
            </div>

            {/* bottom */}
            <div>
              <h2 className="text-lg font-bold">Admin</h2>
              <div className="flex cursor-pointer">
                {system.usersystemlinks.map((admin: any) => (
                  <div className="w-14 h-14" key={admin.id}>
                    <img
                      className="rounded-full bg-white max-w-full h-full w-full align-middle border-none shadow"
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${admin.image_uri}`}
                      alt={admin.username}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.systemReducer.loading,
    system: state.systemReducer.system,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSystemStart: (systemName: string) => dispatch(getSystemStart(systemName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(slugName);
