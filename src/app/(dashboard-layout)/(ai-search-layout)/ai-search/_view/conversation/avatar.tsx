import cn from "@/lib/utils/cn";
import { Sender } from "./type";
import Image from "next/image";

export function Avatar({ sender }: { sender: Sender }) {
    return (
      <div
        className={cn(
          'rounded-full inline-flex items-center justify-center aspect-square min-w-12 bg-black/10 relative',
          sender === 'ai' ? 'bg-white shadow-lg border border-gray-100' : 'bg-[#D1CEDA]'
        )}
      >
        {sender === 'ai' ? (
          <Image src="/logo.png" alt="veraos" width={24} height={24} className="scale-110 translate-y-[2px]" />
        ) : (
          <UserIcon className="w-6 h-6 text-white" />
        )}
      </div>
    );
  }
  
  const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" {...props}>
      <path
        fill="currentColor"
        d="M8.168 8.75A5.84 5.84 0 0 1 14 2.915a5.84 5.84 0 0 1 5.833 5.833A5.84 5.84 0 0 1 14 14.582a5.84 5.84 0 0 1-5.833-5.834Zm10.636 7.082a2.684 2.684 0 0 0-1.948.255 5.887 5.887 0 0 1-5.71 0 2.701 2.701 0 0 0-1.948-.255c-2.324.587-3.947 2.696-3.947 5.129v1.18c0 .744.198 1.472.575 2.106.307.516.882.837 1.5.837h13.35c.617 0 1.192-.32 1.499-.838a4.117 4.117 0 0 0 .575-2.106v-1.18c.001-2.432-1.622-4.54-3.946-5.128Z"
      />
    </svg>
  );
  