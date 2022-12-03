import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../Components/Toast";
import { notify } from "../utils/utils";
import validator from "validator";
import { bake_cookie } from "sfcookies";
import { useDispatch, useSelector } from "react-redux";
import { clearData, login } from "../Components/TeacherLogin/login_slice";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const sendData = () => {
    if (!email || !password) {
      return notify("Please, fill out all the required fields!", "error");
    } else if (!validator.isEmail(email)) {
      return notify("Please enter valid email address!", "error");
    }

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (data.detail) {
      console.log(data.detail);
      notify(data.detail[0], "error");
      dispatch(clearData());
    } else if (data.access) {
      bake_cookie("access_token", data.access);
      bake_cookie("refresh_token", data.refresh);
      bake_cookie("user", data.user);
      dispatch(clearData());
      navigate("/dashboard");
    }
    //eslint-disable-next-line
  }, [data]);

  return (
    <>
      <div className="login-teacher min-h-screen pt-24 px-2 phone:px-10 sm:px-20 md:px-32 lg:px-[33%] bg-home">
        <h1 className="login-header text-2xl text-secText text-center tracking-wider mb-12 uppercase font-bold">
          Login
        </h1>
        <div className="login-body">
          <div className="email mb-4">
            <label
              htmlFor=""
              className="text-mainText text-lg   mb-1 inline-block"
            >
              Login
            </label>
            <div className="flex items-center rounded-lg py-3 px-6 bg-input">
              <i className="fa-solid fa-at text-mainText text-xl mr-3"></i>
              <input
                type="email"
                className=" bg-none text-secText outline-none bg-transparent w-full h-full placeholder:text-mainText placeholder:focus:opacity-50 duration-500 placeholder:text-lg"
                placeholder="sevbo@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    return sendData();
                  }
                }}
              />
            </div>
          </div>
          <div className="password">
            <label
              htmlFor=""
              className="text-mainText text-lg   mb-1 inline-block"
            >
              Password
            </label>
            <div className="flex items-center rounded-lg py-3 px-6 bg-input mb-10">
              <i className="fa-solid fa-lock text-xl mr-3 text-mainText "></i>{" "}
              <input
                type="password"
                className=" bg-none text-secText outline-none bg-transparent w-full h-full placeholder:text-mainText placeholder:focus:opacity-50 duration-500 placeholder:text-lg"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    return sendData();
                  }
                }}
              />
            </div>
          </div>
          <button
            onClick={sendData}
            className="text-secText py-3 px-6 rounded-lg bg-buttonMain text-lg block w-full"
          >
            Submit
          </button>
          <Toast />
        </div>
        <div>
          <span>
            <Link to={"/"} className="text-buttonMain mt-4 inline-block">
              <i className="fa-solid fa-arrow-right mx-2"></i>
              Back to home
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
