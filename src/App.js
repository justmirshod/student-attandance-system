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
import { loginTeacher } from "./Components/TeacherLogin/login_slice";
import CheckAttandance from "./Pages/CheckAttandance";
import TakeAttandance from "./Pages/TakeAttandace";
import OneStudentStatus from "./Pages/OneStudentStatus";

const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = read_cookie("user");
  const access = read_cookie("access_token");

  useEffect(() => {
    if (typeof access !== "object") {
      if (location.pathname === "/teacher-login") {
        return navigate("/");
      }
      dispatch(loginTeacher({ user }));
    } else {
      if (location.pathname === "/" || "/student/id") {
        return navigate(location.pathname);
      }

      return navigate("/teacher-login");
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/id" element={<OneStudentStatus />} />
      {typeof access !== "object" ? null : (
        <Route path={"/teacher-login"} element={<TeacherLogin />} />
      )}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/check-attandance" element={<CheckAttandance />} />
      <Route path="/take-attandance" element={<TakeAttandance />} />
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
