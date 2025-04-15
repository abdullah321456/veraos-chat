'use client';

import cn from '@/lib/utils/cn';
import { Button } from './button';
import { useModal } from '../modal-views/use-modal';

type Props = {
  onConfirm?: () => void;
  icon: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const COLORS = {
  success: 'bg-green-100 text-green-500',
  error: 'bg-red-100 text-red-500',
  warning: 'bg-yellow-100 text-yellow-500',
  info: 'bg-blue-100 text-blue-500',
};

function ConfirmModalComponent({ onConfirm, icon, variant = 'error', title, description, confirmButtonText, cancelButtonText }: Props) {
  const { closeModal } = useModal();
  const CONFIRM_BUTTON_TEXT = confirmButtonText || 'Confirm';
  const CANCEL_BUTTON_TEXT = cancelButtonText || 'Cancel';

  return (
    <div className="p-8">
      <div className="flex justify-center mb-4">
        <div className={cn('inline-flex justify-center p-4 rounded-full', COLORS[variant || 'info'])}>{icon}</div>
      </div>
      <h2 className="text-center font-bold text-xl">{title}</h2>
      <p className="text-center mt-4 text-sm">{description}</p>
      <div className="flex justify-center gap-3 mt-8">
        <Button onClick={() => closeModal()} variant="outline" color="secondary">
          {CANCEL_BUTTON_TEXT}
        </Button>
        <Button color={variant === 'error' ? 'danger' : 'primary'} onClick={onConfirm}>
          {CONFIRM_BUTTON_TEXT}
        </Button>
      </div>
    </div>
  );
}

ConfirmModalComponent.containerClassName = 'w-[500px]';

export const ConfirmModal = ConfirmModalComponent;
