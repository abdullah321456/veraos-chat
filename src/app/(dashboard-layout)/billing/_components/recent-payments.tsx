export function RecentPayments() {
  return (
    <div className="pb-4 sm:pb-6">
      <div className="shadow-lg p-3 sm:p-4 border border-gray-100 rounded-[10px]">
        <h2 className="text-black text-sm sm:text-base font-bold">Recent Payments</h2>
        <div className="mt-4 sm:mt-6 py-6 sm:py-8 text-center">
          <div className="text-gray-500">
            <svg
              className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-xs sm:text-sm font-medium text-gray-900">No recent payments</h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 px-2 break-words">
              Your payment history will appear here once you make your first payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
