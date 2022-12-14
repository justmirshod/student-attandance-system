import Navbar from "../../Components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentAttandanceHistory } from "./studentHistory_slice";
import { read_cookie } from "sfcookies";
import { useParams } from "react-router-dom";

export default function OneStudentStatus() {
  const { studentHistory, loadingStudentHistory } = useSelector(
    (state) => state.history
  );
  const dispatch = useDispatch();
  const token = read_cookie("access_token");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(studentAttandanceHistory({ token, studentId: id }));
  }, []);

  return (
    <>
      <Navbar />
      <div className="student-profile bg-home py-10 px-2 sm:px-20 md:px-32 lg:px-80">
        {loadingStudentHistory || !studentHistory ? (
          "Loading..."
        ) : (
          <>
            {studentHistory.detail ? (
              "Page Not found"
            ) : (
              <>
                {studentHistory.total > 0 ? (
                  <>
                    <h1 className="text-secText font-medium text-2xl tracking-wider mb-3">
                      {`${studentHistory.results[0].student.first_name} ${studentHistory.results[0].student.last_name}`}
                    </h1>
                    <div className="flex items-center justify-between mb-20">
                      <div className="w-[48.5%]">
                        <table className="table-auto w-full rounded-lg overflow-hidden">
                          <tbody className="bg-tableBody">
                            <tr className="border-b border-home ">
                              <td className="px-3 py-2 text-secText">Name</td>
                              <td className="text-right px-3 text-buttonMain">
                                {studentHistory.results[0].student.first_name}
                              </td>
                            </tr>
                            <tr className="border-b border-home ">
                              <td className="px-3 py-2 text-secText">
                                Surname
                              </td>
                              <td className="text-right px-3 text-buttonMain">
                                {studentHistory.results[0].student.last_name}
                              </td>
                            </tr>
                            <tr className="border-b border-home">
                              <td className="px-3 py-2 text-secText">Group</td>
                              <td className="text-right px-3 text-buttonMain">
                                {studentHistory.results[0].student.group.name}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="w-[48.5%]">
                        <table className="table-fixed w-full rounded-md overflow-hidden">
                          <thead className=" bg-tableHead text-mainText">
                            <tr>
                              <td className="p-2 text-center w-1/3">
                                Presents
                              </td>
                              <td className="text-center w-1/3">Abcents</td>
                              <td className="text-center w-1/3">Lates</td>
                            </tr>
                          </thead>
                          <tbody className="bg-tableBody text-secText">
                            <tr>
                              <td className="text-center w-1/3 py-6 text-2xl">
                                <i className="fa-solid fa-circle-check text-buttonMain inline-block mr-1"></i>
                                {
                                  studentHistory.results.filter(
                                    (item) => item.status === "present"
                                  ).length
                                }
                              </td>
                              <td className="text-center w-1/3 py-6 text-2xl">
                                <i className="fa-solid fa-circle-xmark text-[#F03232] inline-block mr-1"></i>
                                {
                                  studentHistory.results.filter(
                                    (item) => item.status === "absent"
                                  ).length
                                }
                              </td>
                              <td className="text-center w-1/3 py-6 text-2xl">
                                <i className="fa-solid fa-hourglass-start text-[#e4990f] inline-block mr-1"></i>
                                {
                                  studentHistory.results.filter(
                                    (item) => item.status === "late"
                                  ).length
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <h1 className="text-secText font-semibold text-xl tracking-wider mb-3">
                      Attandance history
                    </h1>
                    <div>
                      <table className="table-auto w-full rounded-lg overflow-hidden">
                        <thead className="bg-tableHead text-mainText">
                          <tr>
                            <td className="p-3">Subject</td>
                            <td>Date</td>
                            <td>Status</td>
                          </tr>
                        </thead>
                        <tbody className="bg-tableBody text-secText  ">
                          {studentHistory.results.map((item, index, arr) => (
                            <tr
                              className={`${
                                index !== arr.length - 1
                                  ? "border-b border-home"
                                  : null
                              }`}
                            >
                              <td className="p-3">
                                {item.attendance.subject.name.split(" (")[0]}
                              </td>
                              <td>
                                {item.attendance.date
                                  .split("-")
                                  .map((item) => +item)
                                  .reverse()
                                  .map((item) =>
                                    item.toString().length > 1
                                      ? item
                                      : "0" + item.toString()
                                  )
                                  .join("-")}
                              </td>
                              <td>{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  "From this student attandance has not been taken yet!"
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
