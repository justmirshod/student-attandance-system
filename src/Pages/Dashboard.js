import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <h1>Hello dashboard</h1>
      </div>
    </>
  );
}
