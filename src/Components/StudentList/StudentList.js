import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../check_slice";
import { useEffect } from "react";
import { read_cookie } from "sfcookies";

export default function StudentList() {
  const { students, activeGroupId } = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const token = read_cookie("access_token");

  console.log(students);

  useEffect(() => {
    dispatch(fetchStudents({ groupId: activeGroupId, token }));
  }, []);

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}
