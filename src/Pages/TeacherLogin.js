import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../Components/Toast";
import { notify } from "../utils/utils";
import { toast } from "react-toastify";
import validator from "validator";
import { bake_cookie } from "sfcookies";
import { useDispatch, useSelector } from "react-redux";
import { loginTeacher } from "../Components/TeacherLogin/login_slice";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendData = () => {
    if (!email || !password) {
      return toast.error("Please fill out all the fields!");
    } else if (!validator.isEmail(email)) {
      return toast.error("Please enter valid email address!");
    }

    fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.detail) {
          return notify(res.detail[0], "error");
        }

        bake_cookie("access_token", res.access);
        bake_cookie("refresh_token", res.refresh);
        fetch("http://127.0.0.1:8000/accounts/teachers/me/", {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + res.access,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            const name = `${res.first_name} ${res.last_name}`;
            dispatch(loginTeacher({ name, id: res.id }));
          });
        navigate("/dashboard");
      });
  };

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
              />
            </div>
          </div>
          <button
            className="text-secText py-3 px-6 rounded-lg bg-buttonMain text-lg block w-full"
            onClick={sendData}
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
