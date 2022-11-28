import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import { read_cookie } from "sfcookies";

export default function CheckAttandance() {
  const [name, setName] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/accounts/teachers/me/", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + read_cookie("access_token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setName(`${res.first_name} ${res.last_name}`);
      });
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar name={name} />
        <h1>Hello checking</h1>
      </div>
    </>
  );
}
