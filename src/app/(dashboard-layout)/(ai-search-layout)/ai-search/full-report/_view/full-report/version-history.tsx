import { Accordion } from '../../_components/accordion';

export function VersionHistory() {
  const data = [
    {
      title: '1.0',
      dateTime: 'October 20, 2024 10:15 AM',
      summary_changes: 'Initial creation',
    },
    {
      title: '1.1',
      dateTime: 'October 19, 2024 3:45 PM',
      summary_changes: 'Added new address',
    },
    {
      title: '1.2',
      dateTime: 'October 18, 2024 8:00 AM',
      summary_changes: 'Updated employment details',
    },
  ];
  return (
    <Accordion translateButton={false} title="Version History" className="border  bg-[#F8F8F8] pt-3 px-3.5 rounded-lg">
      <div className="mt-3.5 space-y-3 -mx-[15px]">
        <table className="w-full">
          <thead className="bg-white text-[#616166] text-xs font-normal  ">
            <tr className="border-b border">
              <th className="py-2.5 px-6 text-left">Version</th>
              <th className="py-2.5 px-6 text-left">Date Updated</th>
              <th className="py-2.5 px-6 text-left">Summary of Changes</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data.map((item, index) => (
              <tr key={index} className="border-b border bg-white  hover:bg-gray-50 ">
                <td className="py-2.5 px-6 text-black text-xs font-medium">{item.title}</td>
                <td className="py-2.5 px-6 text-xs font-medium ">{item.dateTime}</td>
                <td className="py-2.5 px-6 text-black text-xs font-medium ">{item.summary_changes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Accordion>
  );
}
