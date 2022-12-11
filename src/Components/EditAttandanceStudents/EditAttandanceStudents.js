import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fecthActiveGroupStudents,
  seeCheckedStudentsList,
} from "../edit_slice";
import { read_cookie } from "sfcookies";
import { setExtraDataLoading, addExtraData } from "../edit_slice";

export default function EditAttandanceStudents() {
  const dispatch = useDispatch();
  const token = read_cookie("access_token");
  const { activeGroupId, activeSubject } = useSelector((state) => state.groups);
  const {
    activeGroupStudentsLoading,
    activeGroupStudents,
    checkedStudentsListLoading,
    checkedStudentsList,
  } = useSelector((state) => state.update);
  const { attandanceId } = useSelector((state) => state.see);
  useEffect(() => {
    dispatch(fecthActiveGroupStudents({ token, groupId: activeGroupId }));
  }, []);

  useEffect(() => {
    if (activeGroupStudentsLoading === false) {
      dispatch(
        seeCheckedStudentsList({
          groupId: activeGroupId,
          token,
          attandanceId: attandanceId.filter(
            (item) => item.subject_id == activeSubject
          )[0].attendance_id,
        })
      );
    }
  }, [activeGroupStudentsLoading]);

  useEffect(() => {
    if (
      activeGroupStudents.total &&
      activeGroupStudents.total > 0 &&
      checkedStudentsList.total &&
      checkedStudentsList.total > 0
    ) {
      dispatch(setExtraDataLoading(true));
      for (let item of activeGroupStudents.results) {
        for (let student of checkedStudentsList.results) {
          if (item.id === student.student) {
            dispatch(
              addExtraData({ id: item.id, data: { status: student.status } })
            );
          }
        }
      }
      dispatch(setExtraDataLoading(false));
    }
  }, [checkedStudentsList]);

  return (
    <div className="see_attandance">
      {activeGroupStudentsLoading || activeGroupStudentsLoading === "" ? (
        "Loading..."
      ) : (
        <>
          {checkedStudentsListLoading ? (
            "Loading..."
          ) : (
            <>
              {activeGroupStudents.total === 0 ? (
                "Nothing found"
              ) : (
                <>
                  {checkedStudentsList.total === 0 ? (
                    "Attandance has not been taken from this group yet!"
                  ) : (
                    <>
                      <div className="students_list">
                        <h1 className="flex items-center mb-2">
                          Group:{" "}
                          <span className="ml-1 font-semibold text-lg">
                            {activeGroupStudents.results[0].group.name}
                          </span>
                        </h1>
                        <table className="table-auto w-full">
                          <thead>
                            <tr className="border-b">
                              <td className="p-2 font-bold">Full Name</td>
                              <td className="font-bold text-center">Status</td>
                            </tr>
                          </thead>
                          <tbody>
                            {activeGroupStudents.results.map(
                              (item, index, arr) => (
                                <tr
                                  key={item.id}
                                  className={`${
                                    index !== arr.length - 1 ? "border-b" : null
                                  }`}
                                >
                                  <td className="p-2">
                                    {`${item.first_name} ${item.last_name}`}
                                  </td>
                                  <td>
                                    {item.extraData ? (
                                      <div className="w-full flex justify-center">
                                        <div
                                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                            item.extraData.status === "present"
                                              ? "bg-buttonMain"
                                              : item.extraData.status ===
                                                "absent"
                                              ? "bg-[#f03232]"
                                              : "bg-[#e4990f]"
                                          }`}
                                        >
                                          <i
                                            className={`text-white fa-solid text-[12px] ${
                                              item.extraData.status ===
                                              "present"
                                                ? "fa-check"
                                                : item.extraData.status ===
                                                  "absent"
                                                ? "fa-xmark"
                                                : "fa-hourglass-start"
                                            }`}
                                          ></i>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex justify-center items-center">
                                        <span className="inline-block text-center">
                                          Attandance not taken
                                        </span>
                                      </div>
                                    )}
                                  </td>
                                  <td>
                                    {item.extraData ? (
                                      <>
                                        <button
                                          id="dropdownHelperRadioButton"
                                          data-dropdown-toggle="dropdownHelperRadio"
                                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                          type="button"
                                        >
                                          Dropdown radio{" "}
                                          <svg
                                            className="ml-2 w-4 h-4"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M19 9l-7 7-7-7"
                                            ></path>
                                          </svg>
                                        </button>

                                        <div
                                          id="dropdownHelperRadio"
                                          className="hidden z-10 w-60 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                          data-popper-reference-hidden=""
                                          data-popper-escaped=""
                                          data-popper-placement="top"
                                          style={{
                                            position: "absolute",
                                            inset: "auto auto 0px 0px",
                                            margin: 0,
                                            transform:
                                              "translate3d(522.5px, 6119.5px, 0px)",
                                          }}
                                        >
                                          <ul
                                            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownHelperRadioButton"
                                          >
                                            <li>
                                              <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <div className="flex items-center h-5">
                                                  <input
                                                    id={`helper-radio-${item.id}`}
                                                    name={item.id}
                                                    type="radio"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                  />
                                                </div>
                                                <div className="ml-2 text-sm">
                                                  <label
                                                    htmlFor={`helper-radio-${item.id}`}
                                                    className="font-medium text-gray-900 dark:text-gray-300"
                                                  >
                                                    <div>Individual</div>
                                                    <p
                                                      id={`helper-radio-text-${item.id}`}
                                                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                                                    >
                                                      Some helpful instruction
                                                      goes over here.
                                                    </p>
                                                  </label>
                                                </div>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <div className="flex items-center h-5">
                                                  <input
                                                    id={`helper-radio-${
                                                      item.id + 1
                                                    }`}
                                                    name={item.id}
                                                    type="radio"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                  />
                                                </div>
                                                <div className="ml-2 text-sm">
                                                  <label
                                                    htmlFor={`helper-radio-${
                                                      item.id + 1
                                                    }`}
                                                    className="font-medium text-gray-900 dark:text-gray-300"
                                                  >
                                                    <div>Company</div>
                                                    <p
                                                      id="helper-radio-text-5"
                                                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                                                    >
                                                      Some helpful instruction
                                                      goes over here.
                                                    </p>
                                                  </label>
                                                </div>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <div className="flex items-center h-5">
                                                  <input
                                                    id={`helper-radio-${
                                                      item.id + 2
                                                    }`}
                                                    name={item.id}
                                                    type="radio"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                  />
                                                </div>
                                                <div className="ml-2 text-sm">
                                                  <label
                                                    htmlFor={`helper-radio-${
                                                      item.id + 2
                                                    }`}
                                                    className="font-medium text-gray-900 dark:text-gray-300"
                                                  >
                                                    <div>Non profit</div>
                                                    <p
                                                      id="helper-radio-text-6"
                                                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                                                    >
                                                      Some helpful instruction
                                                      goes over here.
                                                    </p>
                                                  </label>
                                                </div>
                                              </div>
                                            </li>
                                          </ul>
                                        </div>
                                      </>
                                    ) : (
                                      "Sorry, you have to check attandace firstly!"
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
