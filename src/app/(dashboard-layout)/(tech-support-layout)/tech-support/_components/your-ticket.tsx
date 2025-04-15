"use client";
import { useState } from "react";

export function YourTicket() {
  const [tickets] = useState([
    {
      title: "Invoice Payment Issue",
      status: "Open",
      updated: "Feb 8, 2025 10:00 AM",
    },
    {
      title: "Feature Request: Dark Mode",
      status: "Completed",
      updated: "Feb 8, 2025 10:00 AM",
    },
    {
      title: "Delayed Email Notifications",
      status: "In Progress",
      updated: "Feb 8, 2025 10:00 AM",
    },
    {
      title: "System Integration Failure",
      status: "Open",
      updated: "Feb 8, 2025 10:00 AM",
    },
    {
      title: "Data Export Issue",
      status: "In Progress", 
      updated: "Feb 8, 2025 10:00 AM",
    },
  ]);
  return (
    <>
      <div className="p-5 rounded-[10px] shadow-lg w-[880px] border border-gray-50 ">
        <div>
          <h2 className="text-black text-base font-bold">Your Tickets</h2>
          <div className="mt-3.5 space-y-3 -mx-5">
            <table className="w-full">
              <thead className="bg-[#8E8E8E1A] bg-opacity-10 text-[#767676] text-xs font-medium uppercase ">
                <tr className="border-b">
                  <th className="py-3 px-6 text-left">Ticket Title</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Last Updated</th>
                  <th className="py-3 px-6 text-left"></th>
                </tr>
              </thead>
              <tbody className="w-full">
                {tickets.map((ticket, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-gray-50">
                    <td className="py-4 px-6 text-black text-xs font-normal">
                      {ticket.title}
                    </td>
                    <td className="py-4 px-6 text-sx font-medium ">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium uppercase ${
                          ticket.status === "Open"
                            ? "bg-[#0956AE] bg-opacity-10 rounded-[22px] text-[#0956AE] py-1 px-2"
                            : ticket.status === "Completed"
                            ? "bg-[#0EBA81] bg-opacity-10 rounded-[22px] text-[#0EBA81] py-1 px-2"
                            : "bg-[#E9C50E] bg-opacity-10 rounded-[22px] text-[#E9C50E] py-1 px-2"
                        }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-black text-xs font-normal ">
                      {ticket.updated}
                    </td>

                    <td className="py-4 px-6 text-black text-xs font-medium text-right">
                      <button className="bg-[#5C39D9] bg-opacity-10 rounded-[22px] text-[#5C39D9] py-1 px-2">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
