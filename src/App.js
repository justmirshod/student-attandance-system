import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import TeacherLogin from "./Pages/TeacherLogin";
import Dashboard from "./Pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { read_cookie } from "sfcookies";
import {
  loginTeacher,
  setIsStaticLoading,
} from "./Components/TeacherLogin/login_slice";
import CheckAttandance from "./Pages/CheckAttandance";
import TakeAttandance from "./Pages/TakeAttandace";
import OneStudentStatus from "./Pages/OneStudentStatus/OneStudentStatus";
import UpdateAttandance from "./Pages/UpdateAttandance";
import Admin from "./Pages/Admin";

const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = read_cookie("user");
  const access = read_cookie("access_token");
  const { data } = useSelector((state) => state.login);

  useEffect(() => {
    if (typeof access !== "object") {
      if (location.pathname === "/login") {
        return navigate("/");
      }
      if (!data.user) {
        dispatch(setIsStaticLoading(true));
        dispatch(loginTeacher({ user }));
        dispatch(setIsStaticLoading(false));
      }
    } else {
      if (
        location.pathname === "/" ||
        location.pathname.substring(0, 9) === "/student/"
      ) {
        navigate(location.pathname);
      } else {
        navigate("/login");
      }
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {typeof access !== "object" ? null : (
        <Route path={"/login"} element={<TeacherLogin />} />
      )}
      {typeof access !== "object" ? (
        <Route path="/dashboard" element={<Dashboard />} />
      ) : null}
      <Route path="/student/:id" element={<OneStudentStatus />} />
      <Route path="/check-attandance" element={<CheckAttandance />} />
      <Route path="/take-attandance" element={<TakeAttandance />} />
      <Route path="/update-attandance" element={<UpdateAttandance />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <Router>
        <Routing />
      </Router>
    </>
  );
}

export default App;
