import Sidebar from "../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { read_cookie } from "sfcookies";
import { useEffect } from "react";
import { notify } from "../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import {
  clearAttandance,
  fetchGroups,
  setActiveGroup,
  setActiveSubject,
} from "../Components/check_slice";
import Datapicker from "../Components/Datapicker/Datapicker";
import StudentList from "../Components/StudentList/StudentList";
import Toast from "../Components/Toast";
import { clearStudents } from "../Components/StudentList/student_slice";

export default function CheckAttandance() {
  const { data } = useSelector((state) => state.login);
  const { groups, activeGroupId, activeSubject, attandance } = useSelector(
    (state) => state.groups
  );
  const dispatch = useDispatch();
  const token = read_cookie("access_token");

  useEffect(() => {
    if (attandance.length) {
      dispatch(clearAttandance());
      return;
    }
  }, []);

  // useEffect(() => {
  //   if (attandance.length) {
  //     notify(attandance[0], "error");
  //     // dispatch(clearAttandance());
  //     return;
  //   }
  // }, [attandance]);

  useEffect(() => {
    if (data.user) {
      dispatch(fetchGroups({ id: data.user.id, token }));
    }
  }, [data]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="check-attandance w-5/6 min-h-screen flex ">
          <div className="w-2/5 min-h-screen check bg-home p-5">
            <h1 className="text-xl text-secText mb-2">Select subject</h1>
            <div className="flex items-center justify-between">
              {groups.length
                ? groups.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center pl-4 rounded-lg border w-[49%] border-gray-200 dark:border-gray-700"
                    >
                      <input
                        id={`bordered-radio-${item.id}`}
                        type="radio"
                        value={item.id}
                        checked={item.id == activeSubject}
                        name="bordered-radio"
                        className="w-4 border-none h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {
                          dispatch(setActiveSubject(e.target.value));
                          dispatch(clearStudents());
                        }}
                      />
                      <label
                        htmlFor={`bordered-radio-${item.id}`}
                        className="py-4 ml-2 w-full font-medium text-gray-900 dark:text-gray-300"
                      >
                        {item.name.split("(")[0]}
                      </label>
                    </div>
                  ))
                : "Loading..."}
            </div>

            {groups.length && activeSubject ? (
              <div className="duration-1000">
                <h1 className="text-xl text-secText mt-10 mb-2">
                  Select group
                </h1>
                <div className="group_list">
                  <ul className="grid gap-3 w-full md:grid-cols-2">
                    {groups
                      .filter((subject) => subject.id == activeSubject)[0]
                      .group.map((item) => (
                        <li key={item.id}>
                          <input
                            type="radio"
                            id={item.id}
                            name="hosting"
                            value={item.id}
                            checked={item.id == activeGroupId}
                            className="hidden peer"
                            onChange={(e) => {
                              dispatch(setActiveGroup(e.target.value));
                              dispatch(clearStudents());
                            }}
                          />
                          <label
                            htmlFor={item.id}
                            className={`inline-flex justify-between items-center p-3 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-transparent dark:hover:bg-gray-700`}
                          >
                            <div className="block">
                              <div className="w-full text-lg font-semibold">
                                {item.name}
                              </div>
                            </div>
                            <svg
                              aria-hidden="true"
                              className="ml-3 w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
          {groups.length && activeSubject && activeGroupId ? (
            <div className="w-3/5 min-h-screen">
              {attandance.id || attandance.length ? (
                <StudentList />
              ) : (
                <div className="w-4/5 flex justify-center mx-auto mt-10 p-3 shadow-2xl">
                  <Datapicker />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
