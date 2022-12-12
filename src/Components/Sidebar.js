import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { delete_cookie } from "sfcookies";
import { useDispatch, useSelector } from "react-redux";
import { logOutTeacher } from "./TeacherLogin/login_slice";
import { showContent, hideContent, toggleContent } from "./sidebar_slice";
import { clearAll } from "./check_slice";
export default function Sidebar() {
  const location = useLocation();
  const { show } = useSelector((state) => state.sidebar);
  const { data } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = data.user
    ? `${data.user.first_name} ${data.user.last_name}`
    : "";

  const logOut = () => {
    delete_cookie("access_token");
    delete_cookie("refresh_token");
    dispatch(logOutTeacher());
    navigate("/teacher-login");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(clearAll());
  }, [location.pathname]);

  return (
    <div className="sidebar w-1/5 min-h-screen bg-navbar p-4 shadow-2xl">
      <h1 className="text-secText text-xl mb-10 tracking-wide">
        {data.user ? name : "Loading..."}
      </h1>
      <ul className="sidebar_list">
        <li className="text-secText hover:bg-lightblue p-2 rounded-xl duration-75 mb-2">
          <Link to={"/"} className="flex items-center">
            <i className="fa-solid fa-house mx-2"></i>
            <span>Home</span>
          </Link>
        </li>
        <li
          className={
            location.pathname === "/dashboard"
              ? "text-secText hover:bg-lightblue bg-lightblue p-2 rounded-xl duration-75 mb-2"
              : "text-secText hover:bg-lightblue p-2 rounded-xl duration-75 mb-2"
          }
        >
          <Link to={"/dashboard"} className="flex items-center">
            <i className="fa-solid fa-table-columns mx-2"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        {/* {data.user.user_type === "teacher" ? } */}
        <li
          className={`text-secText p-2 rounded-xl duration-75 ${
            show ? "mb-9" : null
          } `}
        >
          <div
            className={
              show
                ? " inline-flex items-center w-3/4 cursor-pointer mb-2 duration-500 mx-2"
                : " inline-flex items-center w-3/4 cursor-pointer duration-500 mx-2"
            }
            onClick={() => dispatch(toggleContent())}
          >
            <i className="fa-solid fa-clipboard-list mr-3"></i>
            <span>Attandance</span>
            <i
              className={
                show
                  ? "fa-solid fa-chevron-down text-xs ml-2 rotate-180 duration-700 mt-[2px]"
                  : "fa-solid fa-chevron-down text-xs ml-2 duration-700 mt-[2px]"
              }
            ></i>
          </div>
          <div
            className={
              show
                ? "h-[85px] duration-500 opacity-100"
                : "h-0 overflow-hidden duration-500 opacity-0"
            }
          >
            <div
              className={
                location.pathname === "/check-attandance"
                  ? "text-secText hover:bg-lightblue bg-lightblue p-2 rounded-xl  duration-75 mb-1 ml-1"
                  : "text-secText hover:bg-lightblue  p-2 rounded-xl  duration-75 mb-1 ml-1"
              }
              onClick={() => dispatch(showContent())}
            >
              <Link to={"/check-attandance"} className="flex items-center">
                <i className="fa-regular fa-square-check mx-2 "></i>
                <span>Check</span>
              </Link>
            </div>
            <div
              onClick={() => dispatch(showContent())}
              className={
                location.pathname === "/take-attandance"
                  ? "text-secText hover:bg-lightblue bg-lightblue p-2 rounded-xl duration-75 mb-1 ml-1"
                  : "text-secText hover:bg-lightblue  p-2 rounded-xl duration-75 mb-1 ml-1"
              }
            >
              <Link to={"/take-attandance"} className="flex items-center">
                <i className="fa-solid fa-eye mx-2"></i>
                <span>See</span>
              </Link>
            </div>
            <div
              className={
                location.pathname === "/update-attandance"
                  ? "text-secText hover:bg-lightblue bg-lightblue p-2 rounded-xl  duration-75 mb-1 ml-1"
                  : "text-secText hover:bg-lightblue  p-2 rounded-xl  duration-75 mb-1 ml-1"
              }
              onClick={() => dispatch(showContent())}
            >
              <Link to={"/update-attandance"} className="flex items-center">
                <i className="fa-solid fa-pen-to-square mx-2"></i>
                <span>Update</span>
              </Link>
            </div>
          </div>
        </li>
        <li className="text-secText p-2 rounded-xl hover:bg-lightblue">
          <Link to={"/profile"}>
            <i className="fa-solid fa-user mx-2"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li className="flex items-center px-2">
          <i className="fa-solid fa-arrow-right-to-bracket text-red-600"></i>
          <button className=" text-red-600 p-2 rounded-xl" onClick={logOut}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}
