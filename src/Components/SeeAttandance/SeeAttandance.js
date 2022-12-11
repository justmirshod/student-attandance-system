import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fecthSeenStudents,
  fecthActiveGroupStudents,
  addExtraData,
  setExtraDataLoading,
} from "../see_slice";
import { read_cookie } from "sfcookies";

export default function SeeAttandance() {
  const token = read_cookie("access_token");
  const dispatch = useDispatch();
  const {
    attandanceId,
    studentAttandanceLoading,
    seeStudentList,
    activeGroupStudents,
    allStudentsLoading,
  } = useSelector((state) => state.see);
  const { activeGroupId, activeSubject, activeDate } = useSelector(
    (state) => state.groups
  );
  useEffect(() => {
    dispatch(fecthActiveGroupStudents({ token, groupId: activeGroupId }));
  }, []);

  useEffect(() => {
    if (allStudentsLoading === false) {
      dispatch(
        fecthSeenStudents({
          token,
          attandanceId: attandanceId.filter(
            (item) => item.subject_id == activeSubject
          )[0].attendance_id,
          groupId: activeGroupId,
        })
      );
    }
  }, [allStudentsLoading]);

  useEffect(() => {
    if (
      activeGroupStudents.total &&
      activeGroupStudents.total > 0 &&
      seeStudentList.total &&
      seeStudentList.total > 0
    ) {
      dispatch(setExtraDataLoading(true));
      for (let item of activeGroupStudents.results) {
        for (let student of seeStudentList.results) {
          if (item.id === student.student) {
            dispatch(
              addExtraData({ id: item.id, data: { status: student.status } })
            );
          }
        }
      }
      dispatch(setExtraDataLoading(false));
    }
  }, [seeStudentList]);

  return (
    <div className="see_attandance">
      {allStudentsLoading || allStudentsLoading === "" ? (
        "Loading..."
      ) : (
        <>
          {studentAttandanceLoading ? (
            "Loading..."
          ) : (
            <>
              {activeGroupStudents.total === 0 ? (
                "Nothing found"
              ) : (
                <>
                  {seeStudentList.total === 0 ? (
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
                              <td className="font-bold">Date</td>
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
                                  <td>{activeDate}</td>
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
                                      "Attandance not taken"
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
