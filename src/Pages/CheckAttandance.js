import Sidebar from "../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { read_cookie } from "sfcookies";
import { useEffect } from "react";
import {
  fetchGroups,
  setActiveGroup,
  setActiveSubject,
} from "../Components/check_slice";

export default function CheckAttandance() {
  const { data } = useSelector((state) => state.login);
  const { groups, activeGroup, activeSubject } = useSelector(
    (state) => state.groups
  );
  const dispatch = useDispatch();
  const access = read_cookie("access_token");

  useEffect(() => {
    if (data.user) {
      dispatch(fetchGroups({ id: data.user.id, token: access }));
    }
  }, [data]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="check-attandance w-5/6 min-h-screen flex items-center ">
          <div className="w-1/3 min-h-screen check bg-home">
            <div className="">
              <select
                name=""
                id=""
                onChange={(e) => dispatch(setActiveSubject(e.target.value))}
              >
                {groups.length
                  ? groups.map((item) => (
                      <option key={item.id} value={item.slug}>
                        {item.name.split(" ")[0]}
                      </option>
                    ))
                  : "Loading..."}
              </select>
            </div>
            {groups.length && activeSubject ? (
              <div className="group_list">
                <select name="" id="">
                  {groups
                    .filter((subject) => subject.slug === activeSubject)[0]
                    .group.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
