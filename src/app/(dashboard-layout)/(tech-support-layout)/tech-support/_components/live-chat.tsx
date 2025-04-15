import { Button } from "@/components/atom/button";

export function LiveChat() {
  return (
    <div className="p-5 rounded-[10px] shadow-lg w-[880px] border border-gray-50 mb-6">
      <h2 className="text-black text-base font-bold">
        Live Chat / AI Assistant
      </h2>
      <div className="space-y-6 text-center">
        <h5 className="text-black text-sm font-medium mt-6">
          Connect with our support team or get instant help from our AI
          Assistant.
        </h5>
        <Button>Start Chat</Button>
      </div>
    </div>
  );
}
