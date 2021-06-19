import { GetServerSideProps } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "../../components/Navbar";
import { redirectNoAuth } from "../../utils/redirect";
import axios from "axios";
import { createSystem } from "../../api/system.request";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return redirectNoAuth(ctx);
};

interface Props {
  authenticated: boolean;
  isSuperAdmin: boolean;
}

const create: React.FC<Props> = ({ isSuperAdmin, authenticated }) => {
  const [name, setName] = useState("");
  const [placed, setPlaced] = useState("");
  const [image, setImage] = useState(Object);
  const [message, setMessage] = useState("");

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("placed", placed);

    try {
      const res = await createSystem(formData);
      if (res) setMessage("System Created");
    } catch (err) {
      setMessage("Sorry, something went wrong");
    }
  };

  return (
    <div>
      <Navbar authenticated={authenticated} isSuperAdmin={isSuperAdmin} />
      <div className="shadow-xl w-1/3 rounded-xl m-auto p-5 mt-10 bg-primary">
        <h1 className="text-center text-xl">Create New System</h1>
        <form onSubmit={handleSubmit}>
          <div className="m-auto text-sm mt-3">
            <label htmlFor="name">Name*</label>
            <input type="text" className="input" name="name" onChange={(e) => setName(e.target.value)} id="name" />
          </div>
          <div className="m-auto text-sm mt-3">
            <label htmlFor="place">Place*</label>
            <input
              className="input"
              name="placed"
              type="text"
              id="place"
              onChange={(e) => setPlaced(e.target.value)}
            />
          </div>
          <div className="m-auto text-sm mt-3">
            <label htmlFor="image">Upload Image*</label>
            <input className="block" name="image" type="file" onChange={handleImageChange} id="image" />
          </div>
          <div className="flex justify-center">
            <input type="submit" className="btn bg-white" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default create;
