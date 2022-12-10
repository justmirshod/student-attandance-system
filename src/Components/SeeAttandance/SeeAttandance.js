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
  } = useSelector((state) => state.see);
  const { activeGroupId, activeSubject } = useSelector((state) => state.groups);
  useEffect(() => {
    dispatch(
      fecthSeenStudents({
        token,
        attandanceId: attandanceId.filter(
          (item) => item.subject_id == activeSubject
        )[0].attendance_id,
        groupId: activeGroupId,
      })
    );
    dispatch(fecthActiveGroupStudents({ token, groupId: activeGroupId }));
  }, []);

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
      {studentAttandanceLoading || !seeStudentList ? (
        "Loading..."
      ) : (
        <>{seeStudentList.total > 0 ? "Hello world" : "Nothing found"}</>
      )}
    </div>
  );
}
