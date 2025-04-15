'use client';

import cn from '@/lib/utils/cn';
import { useState } from 'react';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';
import { useModal } from '@/components/modal-views/use-modal';
import { Button } from '@/components/atom/button';

const noteData = [
  {
    id: 1,
    title: 'Note 1',
    note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia velit recusandae harum optio iste omnis dolores, asperiores nulla dolorem! Ratione laudantium ipsum dolorum eaque eum, explicabo commodi quae quia voluptatum soluta omnis at ut nisi? Voluptatum culpa corporis, mollitia consequuntur inventore nihil provident voluptas consectetur vitae cum aspernatur, dolore, vero est explicabo tenetur eveniet illum maiores ad facilis. Officiis debitis tenetur saepe, culpa cupiditate nulla? Ducimus magnam excepturi ab provident perferendis numquam sequi? Adipisci sed impedit incidunt nobis at earum iste et id? Velit consequuntur inventore ipsum provident repellendus rerum amet, ullam, aspernatur illum voluptate corporis ab quibusdam, error veniam.',
  },
  {
    id: 2,
    title: 'Note 2',
    note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit molestiae error tempora quae. Officiis nihil eveniet maxime vel voluptatibus aperiam, doloremque deleniti ullam molestias odio cum? Sit ipsa unde ipsam?',
  },
];

export function Notes({ isEditable = false }: { isEditable?: boolean }) {
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);
  const { openModal } = useModal();

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
  }
  const Tag = editable ? 'textarea' : 'div';
  return (
    <Accordion
      translateButton={isEditable}
      title="Notes"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div>
        <div
          className={cn(
            'border-2 border-dashed border-primary/0 ring-[1px] ring-gray-200 rounded-lg py-2 px-3',
            editable && 'border-primary'
          )}
        >
          <div className="mt-2">
            <Tag readOnly={!editable} className={cn('w-full resize-none h-32 text-xs focus:outline-none')}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard
              dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Tag>
          </div>
        </div>
        <div className="space-y-1 text-sm mt-3">
          {noteData?.map((note, index) => (
            <div key={note.id} className="flex gap-2">
              <p>
                {index + 1}. {note.title}
              </p>
              <button
                className="text-primary underline"
                onClick={() => {
                  openModal({
                    containerClassName: 'w-[536px]',
                    view: <NoteModal title={note.title} note={note.note} />,
                  });
                }}
              >
                View Note
              </button>
            </div>
          ))}
        </div>
      </div>
    </Accordion>
  );
}

function NoteModal({ title, note }: { title: string; note: string }) {
  const { closeModal } = useModal();
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-lg font-bold text-center mb-4">{title}</h2>
      <p className="text-sm ">{note}</p>
      <div className="flex justify-end mt-6">
        <Button variant="outline" color="secondary" onClick={() => closeModal()}>
          Close
        </Button>
      </div>
    </div>
  );
}
