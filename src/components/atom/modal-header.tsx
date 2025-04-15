'use client';

import cn from '@/lib/utils/cn';
import { ModalCloseIcon } from '@/components/atom/icons/ai-search/modal-close';
import { useModal } from '../modal-views/use-modal';

type Props = {
  title: string;
  className?: string;
  titleClassName?: string;
};

export function ModalHeader({ title, className, titleClassName }: Props) {
  const { closeModal } = useModal();
  return (
    <div className={cn('px-5 py-3.5 rounded-[10px] rounded-b-none border border-b bg-gray-200 flex justify-between', className)}>
      <p className={cn('text-black text-base font-bold', titleClassName)}>{title}</p>
      <button onClick={() => closeModal()}>
        <ModalCloseIcon />
      </button>
    </div>
  );
}
