import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header>
      <div className="mx-auto bg-navbar flex p-3 justify-between  ">
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
            <li>
              <Link to="/teacher-login">
                <button className="bg-buttonMain rounded-lg text-secText py-2 px-4 font-medium">
                  Teachers
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
