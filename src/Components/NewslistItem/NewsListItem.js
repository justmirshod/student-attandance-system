export default function NewsListItem({ item, index, data }) {
  return (
    <>
      <tr
        className={
          index !== data.length - 1
            ? `text-secText bg-tableBody border-b-2 border-home hover:bg-tableHead duration-100`
            : "text-secText bg-tableBody  hover:bg-tableHead duration-100"
        }
      >
        <td className="py-2 px-4">
          {item.name} {item.surname}
        </td>
        <td className="py-2 px-4">{item.group}</td>
        <td className="hidden md:table-cell py-2 px-4">
          {new Date().toLocaleDateString()}
        </td>
        <td className="py-2 px-4">
          {item.absence.length > 0 ? item.absence.join(", ") : item.absence[0]}
        </td>
        <td className="hidden">
          <i class="fa-solid fa-angle-right"></i>
        </td>
      </tr>
    </>
  );
}
