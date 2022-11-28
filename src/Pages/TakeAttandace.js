import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";

export default function TakeAttandance() {
  const name = useSelector((state) => state.login.activeUser);

  return (
    <>
      <div className="flex">
        <Sidebar name={name} />
        <h1>Hello Take</h1>
      </div>
    </>
  );
}
