'use client';
import cn from '@/lib/utils/cn';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';
import { GalleryIcon } from './vehicle-ownership';
type PhotographicArchiveProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};
export function PhotographicArchive({ isEditable = false, isDrawer }: PhotographicArchiveProps) {
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
  }

  const images = ['/archive-2.png', '/archive-3.png', '/archive-4.png', '/archive-5.png', '/archive-6.png', '/archive-1.png'];

  return (
    <Accordion
      translateButton={isEditable}
      title="Photographic Archive"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div>
        <div className="border rounded-lg py-2 px-3">
          <p className="text-xs">Collection of Photos Associated with the Person</p>
          <div className="space-y-2 mt-2">
            <div className={cn(isDrawer ? 'grid grid-cols-3 gap-3 mt-3' : 'grid grid-cols-7 gap-3')}>
              {images.map((src, index) => (
                <div key={index} className="aspect-[126/105]">
                  <Image src={src} alt={`archive-${index + 1}`} width={128} height={105} quality={100} className="w-full h-full" />
                </div>
              ))}
              {editable && (
                <label
                  htmlFor="carImg"
                  className="border-2 border-dashed rounded-lg text-primary font-semibold gap-1.5 text-xs bg-primary/10 border-primary flex flex-col items-center justify-center cursor-pointer p-4"
                >
                  <input type="file" name="carImg" className="hidden" id="carImg" />
                  <GalleryIcon className="w-9 h-9" />
                  Upload Photo
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
}
