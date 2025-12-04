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
import { AddOrEditEmploymentModal } from './add-or-edit-modal';
import { EmploymentFormInputType } from './validation';
import { AIResponseDetail } from '../../../_view/conversation/type';
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

type DataType = EmploymentFormInputType & { id: number };

// Helper function to parse date string to Date object
const parseEmploymentDate = (dateString: string): Date => {
  if (!dateString) return new Date();
  
  // Handle various date formats like "2011 – 2012", "May 2013", "April 2015 – July 2015"
  const dateMatch = dateString.match(/([A-Za-z]+\s+)?(\d{4})/);
  if (dateMatch) {
    const year = parseInt(dateMatch[2]);
    const monthStr = dateMatch[1]?.trim();
    
    if (monthStr) {
      const monthMap: { [key: string]: number } = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3,
        'May': 4, 'June': 5, 'July': 6, 'August': 7,
        'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      const month = monthMap[monthStr] ?? 0;
      return new Date(year, month);
    }
    
    return new Date(year, 0);
  }
  
  return new Date();
};

export function Employment({ isEditable = false, isDrawer, details }: Props) {
  const { openModal } = useModal();
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);

  // Map Employment_Records from details to component state
  const [valuesState, setValuesState] = useState<DataType[]>(() => {
    // Check for Employment_Records in details or in criminals[0]
    const employmentRecords = details?.Employment_Records || 
                             (details?.criminals && details.criminals.length > 0 && details.criminals[0].Employment_Records);
    
    if (employmentRecords && Array.isArray(employmentRecords)) {
      return employmentRecords.map((record: any, index: number) => {
        // Parse the Dates field (e.g., "2011 – 2012", "May 2013 – May 2013")
        const dates = record.Dates?.split('–') || record.Dates?.split('-') || [];
        const startDateStr = dates[0]?.trim() || '';
        const endDateStr = dates[1]?.trim() || dates[0]?.trim() || '';
        
        return {
          id: index + 1,
          companyName: record.Employer || '',
          position: record.Position || '',
          startDate: parseEmploymentDate(startDateStr),
          endDate: parseEmploymentDate(endDateStr),
          responsibilities: record.Location ? `Located in ${record.Location}` : '',
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

  // Don't render if there's no employment data
  const hasAny = valuesState.length > 0;
  if (!hasAny) return null;

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
        <button className="text-xs font-semibold mt-2" style={{ color: '#C0AEFF' }} onClick={handleOpenAddModal}>
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
  const isDarkMode = useDarkModeWithFallback();
  const date = dayJs(data.startDate).format('MMM DD, YYYY') + ' - ' + dayJs(data.endDate).format('MMM DD, YYYY');
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
