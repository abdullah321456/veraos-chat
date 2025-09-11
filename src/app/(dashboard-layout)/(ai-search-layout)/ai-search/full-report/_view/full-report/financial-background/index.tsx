'use client';

import { ModalHeader } from '@/components/atom/modal-header';
import { useModal } from '@/components/modal-views/use-modal';
import cn from '@/lib/utils/cn';
import { useState } from 'react';
import { PiPencil } from 'react-icons/pi';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../../_components/accordion-action-button';
import { Accordion } from '../../../_components/accordion';
import { AddOrEditModal } from './add-or-edit-modal';
import { FormInputType } from './validation';
import { InputArrayDataCell } from '../../../../_components/input-array-data-cell';
import { InputDataCell } from '../../../../_components/input-data-cell';
import { AIResponseDetail } from '../../../../_view/conversation/type';

type Props = {
  isEditable?: boolean;
  isDrawer?: boolean;
  details?: AIResponseDetail;
};

type DataType = FormInputType & { id: number };

const MORTGAGE_DUMMY_DATA: DataType[] = [
  {
    id: 1,
    amount: 400.00,
    rate: 10,
    description: '30-year fixed-rate mortgage for a primary residence in Chicago, IL.',
  },
];

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string | number | any): string => {
  if (!str) return '';
  
  // Convert to string if it's not already
  const strValue = String(str);
  if (strValue.trim() === '') return '';
  
  return strValue
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function FinancialBackground({ isEditable = false, isDrawer, details }: Props) {
  const { openModal } = useModal();
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);
  const [mortgageValuesState, setMortgageValuesState] = useState(MORTGAGE_DUMMY_DATA);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  // Only show if _index equals "bankruptcy"
  const isBankruptcy = details?._index === 'bankruptcy';
  if (!isBankruptcy) return null;

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
  }

  function handleOnAdd(data: FormInputType) {
    const id = +mortgageValuesState?.length + 1;
    setMortgageValuesState((prev) => [...prev, { ...data, id }]);
  }

  function handleOnEdit(data: FormInputType & { id: number }) {
    setMortgageValuesState((prev) => prev.map((item) => (item.id === data.id ? data : item)));
  }

  function handleRemoveField(id: number) {
    setMortgageValuesState((prev) => prev.filter((item) => item.id !== id));
  }

  function handleOpenAddModal() {
    openModal({
      containerClassName: AddOrEditModal.containerClassName,
      view: (
        <>
          <ModalHeader title="Add Mortgage" />
          <AddOrEditModal onAdd={handleOnAdd} />
        </>
      ),
    });
  }

  function handleOpenEditModal(data: DataType) {
    openModal({
      containerClassName: AddOrEditModal.containerClassName,
      view: (
        <>
          <ModalHeader title="Edit Mortgage" />
          <AddOrEditModal value={data} onEdit={handleOnEdit} />
        </>
      ),
    });
  }

  return (
    <Accordion
      translateButton={isEditable}
      title="Financial Background"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className={cn(isDrawer ? "grid gap-3" : "grid grid-cols-3 gap-4")}>
        {details?.COURTDIST && (
          <InputDataCell
            label="Court District"
            value={capitalizeWords(details.COURTDIST)}
            editable={editable}
          />
        )}
        {details?.COUNTY && (
          <InputDataCell
            label="County"
            value={capitalizeWords(details.COUNTY)}
            editable={editable}
          />
        )}
        {details?.FILE_DATE && (
          <InputDataCell
            label="Filing Date"
            value={capitalizeWords(details.FILE_DATE)}
            editable={editable}
          />
        )}
        {details?.CASENUM && (
          <InputDataCell
            label="Case Number"
            value={capitalizeWords(details.CASENUM)}
            editable={editable}
          />
        )}
        {details?.CHAPTER && (
          <InputDataCell
            label="Chapter"
            value={capitalizeWords(details.CHAPTER)}
            editable={editable}
          />
        )}
      </div>
    </Accordion>
  );
}

type SingleProps = {
  data: DataType;
  title: string;
  editable: boolean;
  handleOpenEditModal?: (data: DataType) => void;
  handleRemoveField?: (index: number) => void;
};

function Single({ data, title, editable, handleOpenEditModal, handleRemoveField }: SingleProps) {
  return (
    <div className="border rounded-lg py-2 px-2.5">
      <div className="flex justify-between relative mb-2.5">
        <p className="text-xs">{title}</p>
        {editable && (
          <div className="flex gap-2 text-xs">
            <button className="text-red-500 flex items-center gap-0.5" onClick={() => handleRemoveField?.(data.id)}>
              - Remove
            </button>
            <button className="text-primary flex items-center gap-0.5" onClick={() => handleOpenEditModal?.(data)}>
              <PiPencil /> Edit
            </button>
          </div>
        )}
      </div>
      <div className="text-xs space-y-1 [&_span]:font-semibold">
        <p>
          <span>Amount:</span> ${data.amount.toFixed(2)}
        </p>
        <p>
          <span>Rate:</span> {data.rate}%
        </p>
        <p>
          <span>Description:</span> {data.description}
        </p>
      </div>
    </div>
  );
}
