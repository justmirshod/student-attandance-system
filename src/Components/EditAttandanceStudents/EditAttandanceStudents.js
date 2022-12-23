import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editStudentAttandance,
  fecthActiveGroupStudents,
  seeCheckedStudentsList,
} from "../edit_slice";
import { read_cookie } from "sfcookies";
import { setExtraDataLoading, addExtraData, editStudent } from "../edit_slice";

export default function EditAttandanceStudents() {
  const dispatch = useDispatch();
  const token = read_cookie("access_token");
  const { activeGroupId, activeSubject, activeDate } = useSelector(
    (state) => state.groups
  );
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
              addExtraData({
                id: item.id,
                data: { status: student.status, reportId: student.id },
              })
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
                          <div>
                            Group:{" "}
                            <span className="ml-1 font-semibold text-lg">
                              {activeGroupStudents.results[0].group.name}
                            </span>
                          </div>
                          <div className="ml-2">
                            Date:
                            <span className="ml-1 font-semibold text-lg">
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
                              <td className="p-2 font-bold">Full Name</td>
                              <td className="font-bold text-center">Status</td>
                              <td className="font-bold text-center">Action</td>
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
                                      <div className="flex items-center justify-center">
                                        <select
                                          value={item.extraData.status}
                                          onChange={(e) => {
                                            dispatch(
                                              editStudent({
                                                id: item.id,
                                                status: e.target.value,
                                              })
                                            );
                                            dispatch(
                                              editStudentAttandance({
                                                token,
                                                reportId:
                                                  item.extraData.reportId,
                                                status: e.target.value,
                                              })
                                            );
                                          }}
                                        >
                                          <option value="present">
                                            Present
                                          </option>
                                          <option value="absent">Absent</option>
                                          <option value="late">Late</option>
                                        </select>
                                      </div>
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
