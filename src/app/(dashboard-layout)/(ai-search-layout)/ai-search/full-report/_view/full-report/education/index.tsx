'use client';

import { ModalHeader } from '@/components/atom/modal-header';
import { useModal } from '@/components/modal-views/use-modal';
import cn from '@/lib/utils/cn';
import dayJs from 'dayjs';
import { useState, useEffect } from 'react';
import { PiPencil } from 'react-icons/pi';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../../_components/accordion-action-button';
import { Accordion } from '../../../_components/accordion';
import { AddOrEditModal } from './add-or-edit-modal';
import { FormInputType } from './validation';
import { AIResponseDetail } from '../../../../_view/conversation/type';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

// Helper to get dark mode from localStorage
const getDarkModeFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true';
    } catch {
      return false;
    }
  }
  return false;
};

// Hook to use dark mode with localStorage fallback
const useDarkModeWithFallback = () => {
  const darkModeContext = useDarkMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storageValue = getDarkModeFromStorage();
    const contextValue = darkModeContext.isDarkMode;
    return contextValue === true ? true : storageValue;
  });

  useEffect(() => {
    const updateDarkMode = () => {
      const storageValue = getDarkModeFromStorage();
      const contextValue = darkModeContext.isDarkMode;
      const newValue = contextValue === true ? true : storageValue;
      setIsDarkMode(newValue);
    };

    updateDarkMode();
    window.addEventListener('storage', updateDarkMode);
    const interval = setInterval(updateDarkMode, 100);
    
    return () => {
      window.removeEventListener('storage', updateDarkMode);
      clearInterval(interval);
    };
  }, [darkModeContext.isDarkMode]);

  return isDarkMode;
};

type Props = {
  isEditable?: boolean;
  isDrawer?: boolean;
  details?: AIResponseDetail;
};

type DataType = FormInputType & { id: number };

export function Education({ isEditable = false, isDrawer, details }: Props) {
  const { openModal } = useModal();
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);

  console.log("Education details:", details);

  // Map Education_Records from details to component state
  const [valuesState, setValuesState] = useState<DataType[]>(() => {
    console.log("Initializing education state with details:", details);
    
    // Check for Education_Records in details or in criminals[0]
    const educationRecords = details?.Education_Records || 
                            (details?.criminals && details.criminals.length > 0 && details.criminals[0].Education_Records);
    
    if (educationRecords && Array.isArray(educationRecords)) {
      return educationRecords.map((record: any, index: number) => {
        // Parse graduation year to a Date object (set to January of that year)
        const graduationYear = record.Graduation_Year ? parseInt(record.Graduation_Year) : new Date().getFullYear();
        const graduationDate = new Date(graduationYear, 0); // January of the graduation year
        
        return {
          id: index + 1,
          institution: record.Institution || '',
          degree: record.Degree || '',
          graduationDate: graduationDate,
          gpa: record.GPA || 'N/A',
        };
      });
    }
    return [];
  });

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
    const id = +valuesState?.length + 1;
    setValuesState((prev) => [...prev, { ...data, id }]);
  }

  function handleOnEdit(data: FormInputType & { id: number }) {
    setValuesState((prev) => prev.map((item) => (item.id === data.id ? data : item)));
  }

  function handleRemoveField(id: number) {
    setValuesState((prev) => prev.filter((item) => item.id !== id));
  }

  function handleOpenAddModal() {
    openModal({
      containerClassName: AddOrEditModal.containerClassName,
      view: (
        <>
          <ModalHeader title="Add Education" />
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
          <ModalHeader title="Edit Education" />
          <AddOrEditModal value={data} onEdit={handleOnEdit} />
        </>
      ),
    });
  }

  // Don't render if there's no education data
  const hasAny = valuesState.length > 0;
  if (!hasAny) return null;

  return (
    <Accordion
      translateButton={isEditable}
      title="Education"
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
            title={`Education Record ${index + 1}`}
            editable={editable}
            handleOpenEditModal={handleOpenEditModal}
            handleRemoveField={handleRemoveField}
          />
        ))}
      </div>

      {editable && (
        <button className="text-xs font-semibold mt-2" style={{ color: '#C0AEFF' }} onClick={handleOpenAddModal}>
          + Add Education
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
  const isDarkMode = useDarkModeWithFallback();
  const date = dayJs(data.graduationDate).format('MMM, YYYY');
  const cardBgStyle = isDarkMode 
    ? { background: '#404652', borderColor: 'rgba(255, 255, 255, 0.1)' }
    : { background: undefined, borderColor: undefined };
  const textColorStyle = isDarkMode ? { color: '#FFFFFF' } : undefined;
  const editButtonColorStyle = isDarkMode ? { color: '#C0AEFF' } : undefined;

  return (
    <div className="border rounded-lg py-2 px-2.5" style={cardBgStyle}>
      <div className="flex justify-between relative mb-2.5">
        <p className="text-xs" style={textColorStyle}>{title}</p>
        {editable && (
          <div className="flex gap-2 text-xs">
            <button className="text-red-500 flex items-center gap-0.5" onClick={() => handleRemoveField?.(data.id)}>
              - Remove
            </button>
            <button className="flex items-center gap-0.5" style={editButtonColorStyle} onClick={() => handleOpenEditModal?.(data)}>
              <PiPencil /> Edit
            </button>
          </div>
        )}
      </div>
      <div className="text-xs space-y-1 [&_span]:font-semibold" style={textColorStyle}>
        <p>
          <span>Institution:</span> {data.institution}
        </p>
        <p>
          <span>Degree:</span> {data.degree}
        </p>
        <p>
          <span>Graduation Date:</span> {date}
        </p>
        <p>
          <span>GPA:</span> {data.gpa}
        </p>
      </div>
    </div>
  );
}
