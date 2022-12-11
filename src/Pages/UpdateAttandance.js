import Sidebar from "../Components/Sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SecondarySidebar from "../Components/SecondarySidebar/SecondarySidebar";
import Datapicker from "../Components/Datapicker/Datapicker";
import { notify } from "../utils/utils";
import Toast from "../Components/Toast";
import EditAttandanceStudents from "../Components/EditAttandanceStudents/EditAttandanceStudents";

export default function UpdateAttandance() {
  const name = useSelector((state) => state.login.activeUser);
  const { groups, activeGroupId, activeSubject, attandance } = useSelector(
    (state) => state.groups
  );
  const { attandanceId } = useSelector((state) => state.see);

  useEffect(() => {
    if (attandanceId.detail) {
      notify(attandanceId.detail, "error");
    }
  }, [attandanceId]);

  return (
    <>
      <div className="update_attandance flex">
        <Sidebar name={name} />
        <div className="w-5/6 min-h-screen flex ">
          <SecondarySidebar />
          {groups.length && activeGroupId && activeSubject ? (
            <div className="w-3/5 min-h-screen">
              <div className="w-4/5 mx-auto mt-10 p-5 shadow-2xl rounded-lg">
                {attandanceId.detail ? (
                  <>
                    <Datapicker />
                    <Toast />
                  </>
                ) : attandanceId.length ? (
                  <EditAttandanceStudents />
                ) : (
                  <Datapicker />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
