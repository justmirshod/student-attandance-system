import Navbar from "../Components/Navbar";
import DailyAbsentStudents from "../Components/DailyAbsentStudents/DailyAbsentStudents";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home min-content bg-home py-10 px-2 sm:px-20 md:px-32 lg:px-80 min-h-[100vh - 64px]">
        <div className="all mx-auto">
          <h1 className="text-secText text-3xl font-bold text-center mb-2">
            Buy and Sell Attandance
          </h1>
          <p className="text-center text-mainText mb-10">
            Secure your name with blockchain in an ecosystem of 700+ million
            users and assign it as a link for your personal account, channel or
            group.{" "}
            <span className="text-linkText font-medium">{"Learn more >"}</span>
          </p>
          <div className="search-panel flex items-center rounded-lg py-3 px-6 bg-input mb-10">
            <i className="fa-solid fa-magnifying-glass text-mainText rotate-[90deg] mr-4 text-xl"></i>
            <input
              type="text"
              className=" bg-none text-secText outline-none bg-transparent w-full h-full placeholder:text-mainText placeholder:focus:opacity-50 duration-500 placeholder:text-lg"
              placeholder="Enter a student name"
            />
          </div>
          <div className="students-list">
            <div className="students-head flex items-center justify-between mb-3">
              <span className="text-secText text-xl font-medium inline-block px-1">
                Daily Abcense
              </span>
              <div className="fiters">
                <ul className="flex items-center">
                  <li className="mr-3">
                    <select
                      name=""
                      id=""
                      className=" text-white rounded-lg p-2 bg-tableBody outline-none"
                    >
                      <option value="0">Select Group</option>
                      <option value="1">E-201</option>
                      <option value="2">E-202</option>
                      <option value="3">E-203</option>
                      <option value="4">E-204</option>
                    </select>
                  </li>
                  <li>
                    <select
                      name=""
                      id=""
                      className=" text-white rounded-lg p-2 bg-tableBody outline-none"
                    >
                      <option value="0">Select Subject</option>
                      <option value="1">Calculus</option>
                      <option value="2">English</option>
                    </select>
                  </li>
                </ul>
              </div>
            </div>

            <DailyAbsentStudents />
          </div>
        </div>
      </main>
    </>
  );
}
