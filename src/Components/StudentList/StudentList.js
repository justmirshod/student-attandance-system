import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../check_slice";
import {
  postAttandance,
  defineAttandanceDate,
  fetchPreviuoslyCheckedStudents,
} from "./student_slice";
import { useEffect } from "react";
import { read_cookie } from "sfcookies";

export default function StudentList() {
  const { students, activeGroupId, activeDate, isLoading2, activeSubject } =
    useSelector((state) => state.groups);
  const attandanceId = useSelector((state) => {
    if (state.attandance.attandanceId[0]) {
      return state.attandance.attandanceId.filter(
        (item) => item.subject_id === +activeSubject
      )[0].attendance_id;
    } else {
      return null;
    }
  });
  const attandance = useSelector((state) => state.attandance);
  const { previuoslyCheckedStudents } = useSelector(
    (state) => state.attandance
  );

  const dispatch = useDispatch();
  const token = read_cookie("access_token");

  const addAtt = (studentId, attandanceId, status) => {
    dispatch(postAttandance({ studentId, attandanceId, status, token }));
  };

  useEffect(() => {
    dispatch(defineAttandanceDate({ date: activeDate, token }));
    dispatch(fetchStudents({ groupId: activeGroupId, token }));
  }, []);

  useEffect(() => {
    if (attandanceId) {
      dispatch(
        fetchPreviuoslyCheckedStudents({
          token,
          groupId: activeGroupId,
          attandanceId,
        })
      );
    }
  }, [attandanceId]);

  return (
    <div className="h-screen pt-10 overflow-y-scroll">
      <div className="student_list px-5 py-7 w-[90%] shadow-xl mx-auto rounded-xl">
        {isLoading2 ? (
          "Loading..."
        ) : isLoading2 === false ? (
          <>
            {students.total > 0 ? (
              <>
                <h1 className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    <span className="mr-1">Group: </span>
                    <span className="font-semibold text-lg">{`${students.results[0].group.name}`}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">Date: </span>
                    <span className="font-semibold text-lg">
                      {activeDate
                        .split("-")
                        .map((item) => +item)
                        .reverse()
                        .map((item) =>
                          item.toString().length > 1
                            ? item
                            : "0" + item.toString()
                        )
                        .join("-")}
                    </span>
                  </div>
                </h1>

                <table className="table-auto w-full ">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">F.I.O</th>
                      <th className="text-left">Present</th>
                      <th className="text-left">Abcent</th>
                      <th className="text-left">Late</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.results.map((item, index, arr) => (
                      <tr
                        key={item.id}
                        className={`${
                          index !== arr.length - 1 ? "border-b" : null
                        } relative`}
                      >
                        <td className="p-2">
                          <div className="leading-tight">{`${item.first_name} ${item.last_name}`}</div>
                          <div className="leading-tight text-sm text-buttonMain">
                            {item.email}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center mb-4">
                            <input
                              id={`default-radio-${item.id}`}
                              type="radio"
                              value="present"
                              name={`default-radio-${item.id}`}
                              disabled={
                                attandance.students[0] &&
                                attandance.students.findIndex(
                                  (student) => student.student === item.id
                                ) !== -1
                                  ? true
                                  : false
                              }
                              className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onChange={(e) => {
                                addAtt(item.id, attandanceId, e.target.value);
                              }}
                            />
                            <label
                              htmlFor={`default-radio-${item.id}`}
                              className="w-7 h-7 pres border rounded-full flex items-center justify-center mt-4 focus:bg-buttonMain"
                            >
                              <i className=" text-gray-400 hover:text-white fa-solid fa-check"></i>{" "}
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center mb-4">
                            <input
                              id={`default-radio-${item.id}-${item.id + 1}`}
                              type="radio"
                              value="absent"
                              name={`default-radio-${item.id}`}
                              className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              disabled={
                                attandance.students[0] &&
                                attandance.students.findIndex(
                                  (student) => student.student === item.id
                                ) !== -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                addAtt(item.id, attandanceId, e.target.value);
                              }}
                            />
                            <label
                              htmlFor={`default-radio-${item.id}-${
                                item.id + 1
                              }`}
                              className="w-7 h-7 abcent border rounded-full flex items-center justify-center mt-4 focus:bg-buttonMain"
                            >
                              <i className="text-gray-400 hover:text-white fa-solid fa-xmark"></i>{" "}
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center mb-4">
                            <input
                              id={`default-radio-${item.id}-${item.id + 2}`}
                              type="radio"
                              value="late"
                              name={`default-radio-${item.id}`}
                              className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              disabled={
                                attandance.students[0] &&
                                attandance.students.findIndex(
                                  (student) => student.student === item.id
                                ) !== -1
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                addAtt(item.id, attandanceId, e.target.value);
                              }}
                            />
                            <label
                              htmlFor={`default-radio-${item.id}-${
                                item.id + 2
                              }`}
                              className=" late w-7 h-7 abcent border rounded-full flex items-center justify-center mt-4 focus:bg-buttonMain"
                            >
                              <i className="text-sm text-gray-400 hover:text-white fa-solid fa-hourglass-start"></i>{" "}
                            </label>
                          </div>
                        </td>
                        {/* <td className="w-full">
                          <h1 className="text-center block">
                            Attendance already taken from this student. To
                            change it please invite update page on the left side
                            of the screen
                          </h1>
                        </td> */}
                        <div className="absolute top-0 left-0 h-full w-full">
                          <div className="h-full ml-auto w-3/5 text-center bg-white opacity-90 flex items-center text-red-500">
                            Attendance was already taken from this student
                          </div>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              "Nothing found"
            )}
          </>
        ) : isLoading2 === "error" ? (
          <h1>Error</h1>
        ) : null}
      </div>
    </div>
  );
}
