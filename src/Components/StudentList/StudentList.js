import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { read_cookie } from "sfcookies";
import {
  fetchStudents,
  addExtraDataToExistStudens,
  setExtraDataLoading,
  stopExtraDataLoading,
} from "../check_slice";
import {
  postAttandance,
  defineAttandanceDate,
  fetchPreviuoslyCheckedStudents,
} from "./student_slice";
import { fetchStudentsOnPageChange } from "../Pagination/pagination_slice";
export default function StudentList() {
  const {
    students,
    activeGroupId,
    activeDate,
    fetchStudentsLoading,
    activeSubject,
    addExtraDataLoading,
  } = useSelector((state) => state.groups);
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
  const { previuoslyCheckedStudents, previuoslyCheckedStudentsLoading } =
    useSelector((state) => state.attandance);
  const { currentPage } = useSelector((state) => state.pagination);

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

  useEffect(() => {
    if (previuoslyCheckedStudents.total > 0 && students.total > 0) {
      dispatch(setExtraDataLoading());
      for (let student of students.results) {
        for (let item of previuoslyCheckedStudents.results) {
          if (student.id === item.student) {
            dispatch(
              addExtraDataToExistStudens({
                id: student.id,
                data: { status: item.status },
              })
            );
          }
        }
      }
      dispatch(stopExtraDataLoading());
    }
  }, [previuoslyCheckedStudents]);

  useEffect(() => {
    if (students.total && students.total > 0) {
      dispatch(
        fetchStudentsOnPageChange({
          token,
          attandanceId,
          groupId: activeGroupId,
          activePage: currentPage,
        })
      );
    }
  }, [students.page]);

  return (
    <div className="h-screen py-10 overflow-y-scroll">
      <div className="student_list px-5 py-7 w-[90%] shadow-xl mx-auto rounded-xl">
        {fetchStudentsLoading || previuoslyCheckedStudentsLoading ? (
          "Loading..."
        ) : !fetchStudentsLoading && !previuoslyCheckedStudentsLoading ? (
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

                <table className="table-auto w-full">
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
                        {addExtraDataLoading ? (
                          "Loading..."
                        ) : !addExtraDataLoading ? (
                          <>
                            {item.extraData ? (
                              <div className="absolute w-full h-full top-0 left-0">
                                <div className="w-1/2 ml-auto h-full text-center flex justify-center items-center">
                                  <div className="align-middle">
                                    <span className="mr-2">
                                      Attandance taken!
                                    </span>
                                    <span
                                      className={`w-5 h-5 inline-flex items-center justify-center rounded-full ${
                                        item.extraData.status === "present"
                                          ? "bg-buttonMain"
                                          : item.extraData.status === "absent"
                                          ? "bg-[#f03232]"
                                          : "bg-[#e4990f]"
                                      }`}
                                    >
                                      <i
                                        className={`text-white fa-solid text-[10px] ${
                                          item.extraData.status === "present"
                                            ? "fa-check"
                                            : item.extraData.status === "absent"
                                            ? "fa-xmark"
                                            : "fa-hourglass-start"
                                        }`}
                                      ></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
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
                                          (student) =>
                                            student.student === item.id
                                        ) !== -1
                                          ? true
                                          : false
                                      }
                                      className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      onChange={(e) => {
                                        addAtt(
                                          item.id,
                                          attandanceId,
                                          e.target.value
                                        );
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
                                      id={`default-radio-${item.id}-${
                                        item.id + 1
                                      }`}
                                      type="radio"
                                      value="absent"
                                      name={`default-radio-${item.id}`}
                                      className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      disabled={
                                        attandance.students[0] &&
                                        attandance.students.findIndex(
                                          (student) =>
                                            student.student === item.id
                                        ) !== -1
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        addAtt(
                                          item.id,
                                          attandanceId,
                                          e.target.value
                                        );
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
                                      id={`default-radio-${item.id}-${
                                        item.id + 2
                                      }`}
                                      type="radio"
                                      value="late"
                                      name={`default-radio-${item.id}`}
                                      className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      disabled={
                                        attandance.students[0] &&
                                        attandance.students.findIndex(
                                          (student) =>
                                            student.student === item.id
                                        ) !== -1
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        addAtt(
                                          item.id,
                                          attandanceId,
                                          e.target.value
                                        );
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
                              </>
                            )}
                          </>
                        ) : (
                          "Error"
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              "Nothing found"
            )}
          </>
        ) : (
          <h1>Error</h1>
        )}
      </div>
    </div>
  );
}
