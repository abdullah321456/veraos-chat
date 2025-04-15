import { Accordion } from '../../_components/accordion';

export function AuditTrail() {
  const data = [
    {
      action: 'Viewed',
      user: 'John Doe',
      dateTime: 'October 20, 2024 10:15 AM',
      details: 'Updated employment details',
    },
    {
      action: 'Edited',
      user: 'John Smith',
      dateTime: 'October 19, 2024 3:45 PM',
      details: 'Removed outdated address',
    },
  ];

  return (
    <Accordion translateButton={false} title="Audit Trail" className="border bg-[#F8F8F8] pt-3 px-3.5 rounded-lg">
      <div className="mt-3.5 space-y-3 -mx-[15px]">
        <table className="w-full">
          <thead className="bg-white text-[#616166] text-xs font-normal">
            <tr className="border-b border">
              <th className="py-2.5 px-6 text-left">Action</th>
              <th className="py-2.5 px-6 text-left">User</th>
              <th className="py-2.5 px-6 text-left">Date & Time</th>
              <th className="py-2.5 px-6 text-left">Details</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data.map((item, index) => (
              <tr key={index} className="border-b border bg-white hover:bg-gray-50">
                <td className="py-2.5 px-6 text-black text-xs font-medium">{item.action}</td>
                <td className="py-2.5 px-6 text-xs font-medium">{item.user}</td>
                <td className="py-2.5 px-6 text-xs font-medium">{item.dateTime}</td>
                <td className="py-2.5 px-6 text-black text-xs font-medium">{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Accordion>
  );
}
