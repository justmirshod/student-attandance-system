import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";
import SecondarySidebar from "../Components/SecondarySidebar/SecondarySidebar";
import Datapicker from "../Components/Datapicker/Datapicker";
import { useEffect } from "react";
import SeeAttandance from "../Components/SeeAttandance/SeeAttandance";
import Toast from "../Components/Toast";
import { notify } from "../utils/utils";

export default function TakeAttandance() {
  const name = useSelector((state) => state.login.activeUser);
  const { groups, activeGroupId, activeSubject, attandance } = useSelector(
    (state) => state.groups
  );

  const { attandanceId, seeDateLoading } = useSelector((state) => state.see);

  useEffect(() => {
    notify(attandanceId.detail, "error");
  }, [attandanceId]);

  return (
    <>
      <div className="flex">
        <Sidebar name={name} />
        <div className="check-attandance w-5/6 min-h-screen flex ">
          <SecondarySidebar />
          {groups.length && activeSubject && activeGroupId ? (
            <div className="w-3/5 min-h-screen">
              <div className="w-4/5 flex justify-center mx-auto mt-10 p-3 shadow-2xl">
                {seeDateLoading ? (
                  "Loading..."
                ) : (
                  <>
                    {attandanceId.length ? (
                      <SeeAttandance />
                    ) : attandanceId.detail ? (
                      <>
                        <Datapicker />
                        <Toast />
                      </>
                    ) : (
                      <Datapicker />
                    )}
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
