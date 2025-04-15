'use client';

import { CustomInputLabel } from '@/app/(auth)/signup/_forms/account-and-organization-info.form';
import { AdvancedCheckbox } from '@/components/atom/advance-checkbox';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { PasswordInput } from '@/components/atom/form-elements/password-input/password-input';
import { Textarea } from '@/components/atom/form-elements/textarea';
import { ModalHeader } from '@/components/atom/modal-header';
import { useModal } from '@/components/modal-views/use-modal';
import cn from '@/lib/utils/cn';
import { PasswordFormSchema, zodUtils } from '@/lib/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';

type DossierCollaborationProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

type MessageData = {
  id: string;
  date: Date;
  from: string;
  to: string;
  message: string;
};

const MESSAGES_DUMMY_DATA: MessageData[] = [
  {
    id: '1',
    date: dayjs().add(-1, 'day').toDate(),
    from: 'Arafat Ovi',
    to: 'John Smith',
    message: 'Please review the latest financial insights and let me know if you have any additional findings by the end of the week.',
  },
  {
    id: '2',
    date: dayjs().add(-2, 'day').toDate(),
    from: 'Arafat Ovi',
    to: 'John Smith',
    message: 'Please review the latest financial insights and let me know if you have any additional findings by the end of the week.',
  },
  {
    id: '3',
    date: dayjs().add(-3, 'day').toDate(),
    from: 'Arafat Ovi',
    to: 'John Smith',
    message: 'Please review the latest financial insights and let me know if you have any additional findings by the end of the week.',
  },
];

const COLLABORATOR_IMAGES = ['/justice.png', '/agency.png', '/police.png'];

function getRandom<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

type Collaborator = {
  id: number;
  name: string;
  accessLevel: string;
  lastAccessed: string;
  image: string;
};

const DUMMY_COLLABORATORS = [
  {
    id: 1,
    name: 'John Smith',
    accessLevel: 'Full Access',
    lastAccessed: 'October 22,2024',
    image: '/justice.png',
  },
  {
    id: 2,
    name: 'Jane Doe',
    accessLevel: 'Read Only',
    lastAccessed: 'October 18,2024',
    image: '/agency.png',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    accessLevel: 'Full Access',
    lastAccessed: 'October 15,2024',
    image: '/police.png',
  },
];

function getCollaboratorById(id: number) {
  return DUMMY_COLLABORATORS.find((collaborator) => collaborator.id === id);
}

function getMessageById(id: string) {
  return MESSAGES_DUMMY_DATA.find((message) => message.id === id);
}

export function DossierCollaboration({ isEditable = false, isDrawer }: DossierCollaborationProps) {
  const { openModal } = useModal();
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);
  const [collaborators, setCollaborators] = useState(DUMMY_COLLABORATORS);
  const [messagesState, setMessagesState] = useState(MESSAGES_DUMMY_DATA);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
  }

  function handleOpenAddModal() {
    openModal({
      containerClassName: 'w-[400px]',
      view: (
        <>
          <ModalHeader title="Add Collaborator" />
          <AddCollaboratorModal onSubmit={() => setCollaborators((prev) => [...prev, getRandom(DUMMY_COLLABORATORS)])} />
        </>
      ),
    });
  }

  return (
    <Accordion
      translateButton={isEditable}
      title={
        <span className="text-base text-black font-bold flex gap-2 items-center">
          Dossier Collaboration{' '}
          <Button
            onClick={(e) => {
              openModal({
                containerClassName: 'w-[750px]',
                view: (
                  <div>
                    <ModalHeader title="Message Collaborators" />
                    <MessageSendModal
                      collaborators={collaborators}
                      onSend={(data) => {
                        console.log('on message send: ', data);
                        const messagesData: MessageData[] = data?.recipients.map((recipient) => {
                          const collaborator = getCollaboratorById(recipient);
                          return {
                            id: crypto.randomUUID(),
                            date: new Date(),
                            from: 'John Smith',
                            to: collaborator?.name || '',
                            message: data.message,
                          };
                        });
                        setMessagesState((prev) => {
                          return [...prev, ...messagesData];
                        });
                        const toastMessage = messagesData.length > 1 ? 'Messages sent to collaborators' : 'Message sent to collaborator';
                        toast.success(toastMessage);
                      }}
                    />
                  </div>
                ),
              });
              e.stopPropagation();
            }}
            variant="outline"
            size="sm"
          >
            Message Collaborators
          </Button>
        </span>
      }
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className="border rounded-lg py-2 px-2.5 mb-3">
        <p className="text-xs text-[#616166] font-normal mb-1.5">Access Management</p>
        <div className={cn(isDrawer ? 'grid mt-3 gap-3' : 'grid grid-cols-3 gap-3')}>
          {collaborators?.map((collaborator) => (
            <div key={collaborator.id} className="bg-[#F8F8F8] rounded-lg py-2 px-2.5 flex justify-between">
              <span className="space-y-1.5">
                <h6 className="text-black text-xs font-bold">{collaborator.name}</h6>
                <p className="text-black text-xs font-medium">
                  Access Level: <span className="font-normal">{collaborator.accessLevel}</span>
                </p>
                <p className="text-black text-xs font-medium">
                  Last Accessed: <span className="font-normal">{collaborator.lastAccessed}</span>
                </p>
              </span>
              <Image src={collaborator.image} alt="justice" height={57} width={60} className="aspect-square h-full w-auto" />
            </div>
          ))}
        </div>
        {/* {isLocalEdit && <button onClick={handleOpenAddModal}>Add Collaborator</button>} */}
        {editable && (
          <button className="text-xs text-primary font-semibold mt-2" onClick={handleOpenAddModal}>
            {' '}
            +Add Collaborator
          </button>
        )}
      </div>
      <div className="space-y-2" key={messagesState?.length}>
        {messagesState?.map((item, index) => (
          <SingleMessage
            setMessagesState={setMessagesState}
            key={item.id}
            message={item}
            serial={index + 1}
            enableReply
            collaborators={collaborators}
          />
        ))}
      </div>
    </Accordion>
  );
}

const CollaboratorValidationSchema = z.object({
  email: zodUtils.getStringSchema({ name: 'Email', minErrorMessage: 'Email is required' }),
  password: PasswordFormSchema,
});

type CollaboratorFormInputType = z.infer<typeof CollaboratorValidationSchema>;

function AddCollaboratorModal(props: { onSubmit: (data: CollaboratorFormInputType) => void }) {
  const { closeModal } = useModal();
  const methods = useForm<CollaboratorFormInputType>();

  function onSubmit(inputs: CollaboratorFormInputType) {
    console.log('inputs', inputs);
    props.onSubmit(inputs);
    closeModal();
  }

  const { register, handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-3 space-y-4">
      <Input label="Email" type="email" placeholder="Enter email" {...register('email')} />
      <PasswordInput label="Password" placeholder="Enter password" {...register('password')} />
      <div className="flex justify-end gap-3 mt-4">
        <Button onClick={() => closeModal()} type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

const MessageSendFormSchema = z.object({
  recipients: z.array(z.string()).min(1, { message: 'Please select at least one collaborator' }),
  message: zodUtils.getStringSchema({ name: 'Message', minErrorMessage: 'Message is required' }),
});

type MessageSendFormInputType = z.infer<typeof MessageSendFormSchema>;

function CollaboratorSelection({ collaborators }: { collaborators: Collaborator[] }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<MessageSendFormInputType>();
  return (
    <div>
      <CustomInputLabel label="Select Collaborators" isRequired />
      <div className="grid grid-cols-2 gap-1 -mt-1">
        {collaborators?.map((item) => (
          <AdvancedCheckbox {...register('recipients')} key={item.id} value={item.id}>
            <div className="border cursor-pointer p-2 rounded-md m-1 border-gray-200 ring-0 peer-checked:ring-[2px] peer-checked:bg-primary/10 peer-checked:ring-primary duration-300 text-xs">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <p className="font-semibold">{item.name}</p>
                  <p>
                    Access Level : <span className="font-semibold">{item.accessLevel}</span>
                  </p>
                  <p>
                    Last Accessed: <span className="font-semibold">{item.lastAccessed}</span>
                  </p>
                </div>
                <div>
                  <Image src={item.image} alt="justice" height={57} width={60} className="aspect-square h-[60px] w-auto" />
                </div>
              </div>
            </div>
          </AdvancedCheckbox>
        ))}
      </div>
      {errors?.recipients?.message && <p className="text-red-500 text-sm mt-1">{errors.recipients?.message as string}</p>}
    </div>
  );
}

type MessageSendModalProps = {
  onSend: ({ recipients, message }: { recipients: number[]; message: string }) => void;
  collaborators: Collaborator[];
};

function MessageSendModal({ collaborators, onSend }: MessageSendModalProps) {
  const { closeModal } = useModal();
  const methods = useForm<MessageSendFormInputType>({
    resolver: zodResolver(MessageSendFormSchema),
    defaultValues: {
      recipients: [],
      message: '',
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  function onSubmit(inputs: MessageSendFormInputType) {
    const recipients = inputs.recipients?.map((item) => +item);
    onSend({ recipients, message: inputs.message });
    closeModal();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-3 ">
        <div className="max-h-[520px] overflow-y-auto mb-4 p-1 space-y-4">
          <CollaboratorSelection collaborators={collaborators} />
          <Textarea label="Message" placeholder="Enter message" {...register('message')} error={errors.message?.message} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={() => closeModal()} variant="outline">
            Cancel
          </Button>
          <Button type="submit">Send Message</Button>
        </div>
      </form>
    </FormProvider>
  );
}

function MessageReplyModal({
  messages,
  onReply,
  collaborators,
  setMessagesState,
}: {
  collaborators: Collaborator[];
  messages: MessageData;
  onReply: ({ replyForId, message }: { replyForId: string; message: string }) => void;
  setMessagesState: Dispatch<SetStateAction<MessageData[]>>;
}) {
  const { closeModal } = useModal();
  const methods = useForm({
    resolver: zodResolver(
      z.object({
        message: zodUtils.getStringSchema({ name: 'Message', minErrorMessage: 'Message is required' }),
      })
    ),
    defaultValues: {
      message: '',
    },
  });

  const { register, handleSubmit } = methods;

  function onSubmit(inputs: { message: string }) {
    const data = {
      replyForId: messages.id,
      message: inputs.message,
    };
    onReply?.(data);
    closeModal();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-3 ">
        <SingleMessage
          setMessagesState={setMessagesState}
          enableReply={false}
          message={messages}
          title="Reply for:"
          collaborators={collaborators}
        />
        <br />
        <Textarea label="Reply Message" placeholder="Enter reply message" {...register('message')} />

        <div className="flex justify-end gap-3 pt-4">
          <Button onClick={() => closeModal()} variant="outline">
            Cancel
          </Button>
          <Button type="submit">Send Message</Button>
        </div>
      </form>
    </FormProvider>
  );
}

function SingleMessage({
  message,
  serial,
  enableReply,
  title,
  collaborators,
  setMessagesState,
}: {
  collaborators: Collaborator[];
  message: MessageData;
  serial?: number;
  enableReply: boolean;
  title?: string;
  setMessagesState: Dispatch<SetStateAction<MessageData[]>>;
}) {
  const date = dayjs(message.date).format('MMMM D, YYYY - h:mm A');

  const { openModal } = useModal();

  return (
    <div
      onClick={() => {
        if (!enableReply) return;

        openModal({
          containerClassName: 'w-[600px]',
          view: (
            <div>
              <ModalHeader title="Message Reply" />
              <MessageReplyModal
                setMessagesState={setMessagesState}
                collaborators={collaborators}
                messages={message}
                onReply={(data) => {
                  const replyForMessage = getMessageById(data.replyForId);
                  const toCollaborator = collaborators.find((item) => item.name === replyForMessage?.to) as Collaborator;
                  setMessagesState((prev) => [
                    ...prev,
                    {
                      id: `${prev.length + 1}`,
                      date: new Date(),
                      from: 'Arafat ovi',
                      to: toCollaborator?.name || 'John Doe',
                      message: data.message,
                    },
                  ]);
                }}
              />
            </div>
          ),
        });
      }}
      className="border rounded-lg py-2 px-2.5"
    >
      <p className="text-xs text-gray-500">
        <>{title || <>Messages to Collaborators {serial && serial}</>}</>
      </p>
      <div className="text-xs mt-2 space-y-1">
        <p className="font-semibold">{date}</p>
        <p>
          <span className="font-semibold">From :</span> {message.from}
        </p>
        <p>
          <span className="font-semibold">To :</span> {message.to}
        </p>
        <p>
          <span className="font-semibold">Message :</span> {message.message}
        </p>
      </div>
    </div>
  );
}
