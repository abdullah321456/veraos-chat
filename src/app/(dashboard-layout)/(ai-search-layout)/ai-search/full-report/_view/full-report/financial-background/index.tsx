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

type Props = {
  isEditable?: boolean;
  isDrawer?: boolean;
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

export function FinancialBackground({ isEditable = false, isDrawer }: Props) {
  const { openModal } = useModal();
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);
  const [mortgageValuesState, setMortgageValuesState] = useState(MORTGAGE_DUMMY_DATA);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

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
      {/* top part will be there */}

      {/* --------------------------------- */}
      <div className={cn(isDrawer ? 'grid gap-3 mt-3' : 'grid grid-cols-2 gap-3 ')} key={mortgageValuesState?.toString()}>
        <InputArrayDataCell
          label="Net Worth"
          editable={editable}
          onDone={(value) => console.log('value', value)}
          values={['Estimated at $750,000 (including property holdings savings, and investments).']}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
        {mortgageValuesState.map((data, index) => (
          <Single
            key={data.id}
            data={data}
            title={`Mortgage ${index + 1}`}
            editable={editable}
            handleOpenEditModal={handleOpenEditModal}
            handleRemoveField={handleRemoveField}
          />
        ))}
      </div>

      {editable && (
        <button className="text-xs text-primary font-semibold mt-2" onClick={handleOpenAddModal}>
          + Add Mortgage Record
        </button>
      )}
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
