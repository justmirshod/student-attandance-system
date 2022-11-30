import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";
import { read_cookie } from "sfcookies";
import { useEffect } from "react";

export default function CheckAttandance() {
  const name = useSelector((state) => state.login.activeUser);
  const { userId } = useSelector((state) => state.login);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/accounts/users/${userId}/subjects/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + read_cookie("access_token"),
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar name={name} />
        <div className="check-attandance w-5/6 min-h-screen flex items-center ">
          <div className="w-1/3 min-h-screen check bg-home">
            <div className="">
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
