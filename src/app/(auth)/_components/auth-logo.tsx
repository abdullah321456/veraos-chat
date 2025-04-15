import { ROUTES } from '@/config/routes';
import Image from 'next/image';
import Link from 'next/link';

export function AuthLogo() {
  return (
    <div className="flex items-center justify-center flex-col mb-6">
      <Link href={ROUTES.HOME}>
        <Image src="/logo.png" alt="logo" width={100} height={100} quality={100} className="w-[60px] h-[60px]" />
      </Link>
    </div>
  );
}
