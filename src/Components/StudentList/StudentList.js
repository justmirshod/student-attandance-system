import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../check_slice";
import { useEffect } from "react";
import { read_cookie } from "sfcookies";

export default function StudentList() {
  const { students, activeGroupId, isLoading2 } = useSelector(
    (state) => state.groups
  );
  const dispatch = useDispatch();
  const token = read_cookie("access_token");

  useEffect(() => {
    dispatch(fetchStudents({ groupId: activeGroupId, token }));
  }, []);

  return (
    <div className="student_list p-5 shadow-2xl border w-4/5 mx-auto">
      {isLoading2 ? (
        "Loading..."
      ) : isLoading2 === false ? (
        <>
          <h1 className="text-lg text-home">Students list</h1>
          {students.total > 0 ? (
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
                      {`${item.first_name} ${item.last_name}`} <br />{" "}
                      {item.email}
                    </td>
                    <td>
                      <div class="flex items-center mb-4">
                        <input
                          id={`default-radio-${item.id}`}
                          type="radio"
                          value=""
                          name={`default-radio-${item.id}`}
                          className=" check w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                        <label
                          htmlFor={`default-radio-${item.id}`}
                          className="w-6 h-6 border flex items-center justify-center rounded-sm mt-4 focus:bg-buttonMain"
                        >
                          <i class=" hidden fa-solid fa-check"></i>{" "}
                        </label>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center mb-4">
                        <input
                          id={`default-radio-${item.id}-${item.id + 1}`}
                          type="radio"
                          value=""
                          name={`default-radio-${item.id}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center mb-4">
                        <input
                          id={`default-radio-${item.id}-${item.id + 2}`}
                          type="radio"
                          value=""
                          name={`default-radio-${item.id}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
