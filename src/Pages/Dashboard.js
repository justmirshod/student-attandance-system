import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Dashboard() {
  const { data } = useSelector((state) => state.login);
  const datePart = new Date().getHours();

  let isMorning = datePart > 5 && datePart < 12;
  let isAfternoon = datePart >= 12 && datePart < 18;
  let isEvening = datePart >= 18 && datePart < 24;
  let isDawn = datePart >= 0 && datePart < 5;

  const name = data.user
    ? `${data.user.first_name} ${data.user.last_name}`
    : "";

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="dash-main min-h-screen bg-home w-5/6">
          <div className="content w-1/2 mx-auto my-32 text-lightgray">
            {data.user ? (
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
            ) : (
              "Loading..."
            )}

            <p>Here you can find brief information on how to use the site...</p>
          </div>
        </div>
      </div>
    </>
  );
}
