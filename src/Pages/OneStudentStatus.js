import Navbar from "../Components/Navbar";

export default function OneStudentStatus() {
  return (
    <>
      <Navbar />
      <div className="student-profile w-screen bg-home py-10 px-2 sm:px-20 md:px-32 lg:px-80">
        <h1 className="text-secText font-medium text-2xl tracking-wider mb-3">
          Mirshod Murodov
        </h1>
        <div className="flex items-center justify-between mb-20">
          <div className="w-[48.5%]">
            <table className="table-auto w-full rounded-lg overflow-hidden">
              <tbody className="bg-tableBody">
                <tr className="border-b border-home ">
                  <td className="px-3 py-2 text-secText">Name</td>
                  <td className="text-right px-3 text-buttonMain">Mirshod</td>
                </tr>
                <tr className="border-b border-home ">
                  <td className="px-3 py-2 text-secText">Surname</td>
                  <td className="text-right px-3 text-buttonMain">Murodov</td>
                </tr>
                <tr className="border-b border-home">
                  <td className="px-3 py-2 text-secText">Group</td>
                  <td className="text-right px-3 text-buttonMain">E-201</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-[48.5%]">
            <table className="table-fixed w-full rounded-md overflow-hidden">
              <thead className=" bg-tableHead text-mainText">
                <tr>
                  <td className="p-2 text-center w-1/3">Presents</td>
                  <td className="text-center w-1/3">Abcents</td>
                  <td className="text-center w-1/3">Lates</td>
                </tr>
              </thead>
              <tbody className="bg-tableBody text-secText">
                <tr>
                  <td className="text-center w-1/3 py-6 text-2xl">
                    <i className="fa-solid fa-circle-check text-buttonMain inline-block mr-1"></i>
                    7
                  </td>
                  <td className="text-center w-1/3 py-6 text-2xl">
                    <i className="fa-solid fa-circle-xmark text-[#F03232] inline-block mr-1"></i>
                    2
                  </td>
                  <td className="text-center w-1/3 py-6 text-2xl">
                    <i className="fa-solid fa-hourglass-start text-[#e4990f] inline-block mr-1"></i>
                    1
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
          <table className="table-auto w-full">
            <thead className="bg-tableHead text-mainText"></thead>
          </table>
        </div>
      </div>
    </>
  );
}
