import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";
import Datapicker from "../Components/Datapicker/Datapicker";
import StudentList from "../Components/StudentList/StudentList";
import SecondarySidebar from "../Components/SecondarySidebar/SecondarySidebar";

export default function CheckAttandance() {
  const { groups, activeGroupId, activeSubject, attandance } = useSelector(
    (state) => state.groups
  );

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="check-attandance w-5/6 min-h-screen flex ">
          <SecondarySidebar />
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
