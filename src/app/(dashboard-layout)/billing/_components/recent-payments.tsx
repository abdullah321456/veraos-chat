"use client";
import { useState } from "react";

export function RecentPayments() {
  const [payments] = useState([
    {
      date: "Jan 15,2025",
      payment_method: "Visa **** 1234",
      amount: "$99.00",
      status: "successful",
    },
    {
      date: "Feb 14,2025",
      payment_method: "Visa **** 3234",
      amount: "$129.00",
      status: "successful",
    },
    {
      date: "Mar 1,2025",
      payment_method: "Visa **** 1203",
      amount: "$69.00",
      status: "successful",
    },
  ]);
  return (
   <div className="pb-6">
     <div className="shadow-lg p-4 border border-gray-100 rounded-[10px] ">
        <h2 className="text-black text-base font-bold">Recent Payments</h2>
        <div className="mt-3.5 space-y-3 -mx-[16px]">
          <table className="w-full">
            <thead className="bg-[#8E8E8E1A] bg-opacity-10 text-[#767676] text-xs font-medium uppercase ">
              <tr className="border-b">
                <th className="py-3 px-6 text-left">Ticket Title</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Last Updated</th>
                <th className="py-3 px-6 mr-4">Status</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50">
                  <td className="py-3 px-6 text-black text-xs font-normal">
                    {payment.date}
                  </td>
                  <td className="py-3 px-6 text-sx font-medium ">
                    {payment.payment_method}
                  </td>
                  <td className="py-3 px-6 text-black text-xs font-normal ">
                    {payment.amount}
                  </td>

                  <td className="py-3 px-6 text-black text-xs font-medium text-right">
                    <span className="bg-[#0EBA81] bg-opacity-10 rounded-[22px] text-[#0EBA81] py-1 px-2 mr-1">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </div>
   </div>
  );
}
