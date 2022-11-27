import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import { useDispatch } from "react-redux";
import { logOutTeacher } from "./TeacherLogin/login_slice";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ name }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    delete_cookie("access_token");
    delete_cookie("refresh_token");
    dispatch(logOutTeacher());
    navigate("/teacher-login");
    window.location.reload();
  };

  return (
    <div className="sidebar w-1/5 min-h-screen bg-navbar p-4 ">
      <h1 className="text-secText text-lg mb-10">{name}</h1>
      <ul>
        <li className="text-secText hover:bg-lightblue p-2 rounded-xl duration-75 mb-2">
          <Link to={"/"} className="block">
            Home
          </Link>
        </li>
        <li
          className={
            location.pathname === "/dashboard"
              ? "text-secText hover:bg-lightblue bg-lightblue p-2 rounded-xl duration-75 mb-2"
              : "text-secText hover:bg-lightblue p-2 rounded-xl duration-75 mb-2"
          }
        >
          <Link to={"/dashboard"} className="block">
            Dashboard
          </Link>
        </li>
        <li
          className={
            location.pathname === "/check-attandance"
              ? "text-secText hover:bg-lightblue bg-lightblue p-2 rounded-xl duration-75 mb-2"
              : "text-secText hover:bg-lightblue  p-2 rounded-xl duration-75 mb-2"
          }
        >
          <Link to={"/check-attandance"} className="block">
            Check attandance
          </Link>
        </li>
        <li
          className={
            location.pathname === "/take-attandance"
              ? "text-secText hover:bg-lightblue bg-lightblue p-2 rounded-xl duration-75 mb-2"
              : "text-secText hover:bg-lightblue  p-2 rounded-xl duration-75 mb-2"
          }
        >
          <Link to={"/take-attandance"} className="block">
            Take attandance
          </Link>
        </li>
        <li>
          <button className="text-white p-2 rounded-xl" onClick={logOut}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}
