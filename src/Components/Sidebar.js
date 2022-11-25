import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar w-1/5 min-h-screen bg-home">
      <h1 className="text-secText">Students Attandance system</h1>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
