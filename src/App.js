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

const Routing = () => {
  const { loggedIn } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogged = read_cookie("access_token");
    if (typeof isLogged !== "object") {
      dispatch(loginTeacher("murodov"));
      navigate("/dashboard");
    } else {
      if (location.pathname === "/teacher-login") {
        navigate("/teacher-login");
      } else {
        navigate("/");
      }
      // navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />

      {loggedIn ? <Route path="/dashboard" element={<Dashboard />} /> : null}
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
