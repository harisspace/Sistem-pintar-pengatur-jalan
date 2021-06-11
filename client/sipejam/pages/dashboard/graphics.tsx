import NavbarLeft from "../../components/NavbarLeft";

export default function graphics() {
  return (
    <div className="grid grid-cols-12">
      <NavbarLeft />
      <div className="col-span-10 bg-gray-100 min-h-screen"></div>
    </div>
  );
}
