import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../check_slice";
import { useEffect } from "react";
import { read_cookie } from "sfcookies";

export default function StudentList() {
  const { students, activeGroupId, activeDate, isLoading2 } = useSelector(
    (state) => state.groups
  );
  const dispatch = useDispatch();
  const token = read_cookie("access_token");

  useEffect(() => {
    dispatch(fetchStudents({ groupId: activeGroupId, token }));
  }, []);

  return (
    <div className="student_list px-5 py-7 w-[90%] mx-auto rounded-xl mt-10">
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
                      className={index !== arr.length - 1 ? "border-b" : null}
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
                            value=""
                            name={`default-radio-${item.id}`}
                            className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => {
                              console.log(e.target.value);
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
                            value=""
                            name={`default-radio-${item.id}`}
                            className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => {
                              console.log(e.target.value);
                            }}
                          />
                          <label
                            htmlFor={`default-radio-${item.id}-${item.id + 1}`}
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
                            value=""
                            name={`default-radio-${item.id}`}
                            className="hidden check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => {
                              console.log(e.target.value);
                            }}
                          />
                          <label
                            htmlFor={`default-radio-${item.id}-${item.id + 2}`}
                            className=" late w-7 h-7 abcent border rounded-full flex items-center justify-center mt-4 focus:bg-buttonMain"
                          >
                            <i className="text-sm text-gray-400 hover:text-white fa-solid fa-hourglass-start"></i>{" "}
                          </label>
                        </div>
                      </td>
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
  );
}
