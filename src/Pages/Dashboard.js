import Sidebar from "../Components/Sidebar";
import { useEffect } from "react";
import { read_cookie } from "sfcookies";
import { useState } from "react";
import dash_sidebar from "../assets/sidebar.png";

export default function Dashboard() {
  const [name, setName] = useState("");

  const datePart = new Date().getHours();

  let isMorning = datePart > 5 && datePart <= 11;
  let isAfternoon = datePart > 11 && datePart <= 18;
  let isEvening = datePart > 18 && datePart <= 24;
  let isDawn = datePart > 24 && datePart <= 5;

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
        <div className="dash-main min-h-screen bg-home w-5/6">
          <div className="content w-1/2 mx-auto my-32 text-lightgray">
            <h1 className="text-xl mb-4">
              {isMorning
                ? "Good morning"
                : isAfternoon
                ? "Good afternoon"
                : isEvening
                ? "Good evening"
                : "Good morning"}{" "}
              {name[name.length - 1] === "a" ? "Mrs." : "Mr."} {name} ))
            </h1>
            <p>Here you can find brief information on how to use the site...</p>
          </div>
        </div>
      </div>
    </>
  );
}
