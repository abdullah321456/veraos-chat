'use client';

import { ModalHeader } from '@/components/atom/modal-header';
import { useModal } from '@/components/modal-views/use-modal';
import cn from '@/lib/utils/cn';
import dayJs from 'dayjs';
import { useState } from 'react';
import { PiPencil } from 'react-icons/pi';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../../_components/accordion-action-button';
import { Accordion } from '../../../_components/accordion';
import { AddOrEditEmploymentModal } from './add-or-edit-modal';
import { EmploymentFormInputType } from './validation';

type Props = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

type DataType = EmploymentFormInputType & { id: number };

const DUMMY_DATA: DataType[] = [
  {
    id: 1,
    companyName: 'ABC Corp',
    position: 'Marketing Manager',
    startDate: dayJs().add(-1, 'year').toDate(),
    endDate: dayJs().toDate(),
    responsibilities: 'Oversee marketing campaigns, manage a team of 5, develop strategic marketing plans.',
  },
  {
    id: 2,
    companyName: '123 Solutions',
    position: 'Intern',
    startDate: dayJs().add(-2, 'year').toDate(),
    endDate: dayJs().add(-1, 'year').toDate(),
    responsibilities: 'Assisted in the execution of marketing strategies, coordinated events, and maintained social media presence.',
  },
];

export function Employment({ isEditable = false, isDrawer }: Props) {
  const { openModal } = useModal();
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);
  const [valuesState, setValuesState] = useState(DUMMY_DATA);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
  }

  function handleOnAdd(data: EmploymentFormInputType) {
    const id = +valuesState?.length + 1;
    setValuesState((prev) => [...prev, { ...data, id }]);
  }

  function handleOnEdit(data: EmploymentFormInputType & { id: number }) {
    setValuesState((prev) => prev.map((item) => (item.id === data.id ? data : item)));
  }

  function handleRemoveField(id: number) {
    setValuesState((prev) => prev.filter((item) => item.id !== id));
  }

  function handleOpenAddModal() {
    openModal({
      containerClassName: AddOrEditEmploymentModal.containerClassName,
      view: (
        <>
          <ModalHeader title="Add Employment" />
          <AddOrEditEmploymentModal onAdd={handleOnAdd} />
        </>
      ),
    });
  }

  function handleOpenEditModal(data: DataType) {
    openModal({
      containerClassName: AddOrEditEmploymentModal.containerClassName,
      view: (
        <>
          <ModalHeader title="Edit Employment" />
          <AddOrEditEmploymentModal value={data} onEdit={handleOnEdit} />
        </>
      ),
    });
  }

  return (
    <Accordion
      translateButton={isEditable}
      title="Employment"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      {/* top part will be there */}

      {/* --------------------------------- */}
      <div className={cn(isDrawer ? 'grid gap-3 mt-3' : 'grid grid-cols-2 gap-3 ')} key={valuesState?.toString()}>
        {valuesState.map((data, index) => (
          <Single
            key={data.id}
            data={data}
            title={`Employment Record ${index + 1}`}
            editable={editable}
            handleOpenEditModal={handleOpenEditModal}
            handleRemoveField={handleRemoveField}
          />
        ))}
      </div>

      {editable && (
        <button className="text-xs text-primary font-semibold mt-2" onClick={handleOpenAddModal}>
          + Add Employment
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
  const date = dayJs(data.startDate).format('MMM DD, YYYY') + ' - ' + dayJs(data.endDate).format('MMM DD, YYYY');
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
          <span>Company:</span> {data.companyName}
        </p>
        <p>
          <span>Position:</span> {data.position}
        </p>
        <p>
          <span>Date Employed:</span> {date}
        </p>
        <p>
          <span>Responsibilities:</span> {data.responsibilities}
        </p>
      </div>
    </div>
  );
}
