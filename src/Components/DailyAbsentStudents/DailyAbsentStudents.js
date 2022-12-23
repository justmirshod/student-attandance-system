export default function DailyAbsentStudents() {
  return (
    <>
      <table className=" table-fixed md:table-auto w-full rounded-md overflow-hidden">
        <thead className="bg-tableHead ">
          <tr className="text-mainText">
            <th className="text-left font-medium py-2 px-4">Student Name</th>
            <th className="text-left font-medium py-2 px-4">Group</th>
            <th className="text-left font-medium  hidden md:table-cell py-2 px-4">
              Date
            </th>
            <th className="py-2 px-4 text-left font-medium">Absent Lessons</th>
            <th className="hidden"></th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </>
  );
}
