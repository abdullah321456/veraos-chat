import { Accordion } from "../../_components/accordion";

export function UserActivityTracking() {
  const data = [
    {
      user: "John Doe",
      accessType: "View",
      dateTime: "October 20, 2024 10:15 AM",
    },
    {
      user: "Jane Smith",
      accessType: "Edited",
      dateTime: "October 19, 2024 3:45 PM",
    },
    {
      user: "Admin User",
      accessType: "View",
      dateTime: "October 18, 2024 8:00 AM",
    },
  ];
  return (
    <Accordion
    translateButton={false}
      title="User activity tracking"
      className="border  bg-[#F8F8F8] pt-3 px-3.5 rounded-lg">
      <div className="mt-3.5 space-y-3 -mx-[15px]">
        <table className="w-full">
          <thead className="bg-white text-[#616166] text-xs font-normal  ">
            <tr className="border-b border">
              <th className="py-2.5 px-6 text-left">Ticket Title</th>
              <th className="py-2.5 px-6 text-left">Status</th>
              <th className="py-2.5 px-6 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border bg-white  hover:bg-gray-50">
                <td className="py-2.5 px-6 text-black text-xs font-medium">
                  {item.user}
                </td>
                <td className="py-2.5 px-6 text-xs font-medium ">
                  {item.accessType}
                </td>
                <td className="py-2.5 px-6 text-black text-xs font-medium ">
                  {item.dateTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Accordion>
  );
}
