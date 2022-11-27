import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { delete_cookie } from "sfcookies";
import { logOutTeacher } from "../Components/TeacherLogin/login_slice";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const data = useSelector((state) => state.login);
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
    <>
      <header>
        <div className="mx-auto bg-navbar flex py-3 px-3 justify-between  ">
          <div className="nav-brand">
            <Link to="/">
              <span className="mr-2">
                <i className="fa-solid fa-building-columns text-secText text-2xl"></i>
              </span>
              <span className="text-secText uppercase font-semibold text-lg ">
                Fragment
              </span>
            </Link>
          </div>
          <div className="">
            <ul className="flex items-center justify-end">
              <li className="mr-2">
                {data.loggedIn ? (
                  <Link to={"/dashboard"}>
                    <button className=" bg-buttonMain rounded-lg text-secText py-2 px-4 font-medium">
                      Dashboard
                    </button>
                  </Link>
                ) : null}
              </li>
              <li>
                {data.loggedIn ? (
                  <button
                    className="bg-buttonSec rounded-lg text-secText py-2 px-4 font-medium"
                    onClick={logOut}
                  >
                    Log out
                  </button>
                ) : (
                  <Link to="/teacher-login">
                    <button className="bg-buttonMain rounded-lg text-secText py-2 px-4 font-medium">
                      Teachers
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
