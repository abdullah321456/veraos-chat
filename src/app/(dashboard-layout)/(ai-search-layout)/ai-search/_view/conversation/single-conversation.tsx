'use client';

import cn from '@/lib/utils/cn';
import { SVGProps, ReactNode } from 'react';
import { Avatar } from './avatar';
// import { ConversationCta } from './cta';
import dynamic from 'next/dynamic';
const ConversationCta = dynamic(() => import('./cta').then((mod) => mod.ConversationCta), { ssr: false });
import { AiResponseDetails } from './response-details';
import { AIResponseDetail, OnImageSearchHandlerParam, Sender } from './type';
import React from 'react';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

type SingleConversationProps = {
  sender: Sender;
  message?: string | ReactNode;
  images?: OnImageSearchHandlerParam;
  cta: boolean;
  aiResponseDetails?: AIResponseDetail[];
};

export function SingleConversation({ sender, message, cta, aiResponseDetails, images }: SingleConversationProps) {
  const isLeft = sender === 'ai';
  const questionId = `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const [localImages, setLocalImages] = React.useState<OnImageSearchHandlerParam>(images || []);
  
  console.log('SingleConversation - message:', message, 'cta:', cta, 'sender:', sender);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      setLocalImages([...localImages, ...newImages]);
    }
  };

  console.log("aiResponseDetails = ",aiResponseDetails)
    return (
    <div id={questionId} className="pt-1 pb-3 pr-0.5 sm:pr-3 group w-full min-w-0 box-border">
      <p className={cn('px-1 sm:px-4 md:px-8 lg:px-16 mb-1.5 text-xs sm:text-sm font-medium', isLeft ? 'text-left' : 'text-right')} style={{ color: '#616166' }}>{isLeft ? 'Tin Man' : 'You'}</p>
      <div className={cn('flex w-full gap-1 sm:gap-4 min-w-0', isLeft ? 'items-end justify-start' : 'items-end justify-end flex-row-reverse')}>
        <div className="flex-shrink-0 self-end">
          <Avatar sender={sender} />
        </div>
        <div className={cn('flex min-w-0 flex-1', isLeft ? 'items-end' : 'items-end justify-end self-end')}>
          <RenderMessageOrImages message={message} isLeft={isLeft} images={localImages} />
        </div>
      </div>
      {cta && <ConversationCta message={message} fullReportDetails={aiResponseDetails?.[0]} />}
      <AiResponseDetails detailsData={aiResponseDetails ?? []} />
    </div>
  );
}

type RenderMessageOrImagesProps = {
  message?: string | ReactNode;
  images?: OnImageSearchHandlerParam;
  isLeft: boolean;
};

function RenderMessageOrImages({ message, isLeft, images }: RenderMessageOrImagesProps) {
  const { isDarkMode } = useDarkMode();
  const baseClassName = 'max-w-full sm:max-w-[500px] md:max-w-[650px] py-5 px-2 sm:py-4 sm:px-4 text-xs sm:text-sm relative w-full min-w-0 box-border break-words' ;
  const className = cn(
    baseClassName,
    !isLeft ? 'bg-[#4795f9] text-white rounded-2xl rounded-ee-sm' : ''
  );
  
  const leftStyle = isLeft ? {
    backgroundColor: isDarkMode ? '#404652' : '#F6F6F9',
    boxShadow: isDarkMode ? '0px -1px 14.8px 0px #EDECFD40 inset' : '0px 2px 16px 0px #191A6024 inset',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
    borderBottomLeftRadius: '15px',
    borderTopLeftRadius: '0px'
  } : {
    backgroundColor: isDarkMode ? '#404652' : '#F4F3FF',
    boxShadow: isDarkMode ? '0px -1px 14.8px 0px #EDECFD40 inset' : '0px -4px 8.6px 0px #E2DFF0 inset',
    color: isDarkMode ? '#FFFFFF' : '#000000',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '15px',
    borderBottomLeftRadius: '15px',
    borderTopLeftRadius: '15px'
  };


  const actionButtonClassName = cn(
    'absolute top-1/2 -translate-y-1/2 w-8 h-8 group-hover:visible invisible',
    !isLeft ? '-left-10' : '-right-10'
  );

  // Only show action icon for AI messages (isLeft = true)
  const ActionIcon = isLeft ? DotsIcon : null;

  if (message) {
    return (
      <div className={className} style={leftStyle}>
        {message}
      </div>
    );
  }

  return (
    <div className={cn(className, 'flex gap-2 sm:gap-4 flex-wrap')} style={leftStyle}>
      {images?.map((item, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={index} src={item.url} alt="" className="min-w-24 sm:min-w-32 inline-block max-w-24 sm:max-w-32 h-auto" />
      ))}
      {ActionIcon && <button className={actionButtonClassName}>{<ActionIcon className="w-4 h-4 sm:w-5 sm:h-5" />}</button>}
    </div>
  );
}

const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M3.644 14.305a.656.656 0 0 1-.464-1.12L13.435 2.93a.657.657 0 1 1 .928.928L4.108 14.113a.655.655 0 0 1-.464.192Z"
    />
    <path
      fill="currentColor"
      d="M2.63 19.031a.655.655 0 0 1-.642-.794l1.014-4.726a.656.656 0 1 1 1.283.276l-1.013 4.726a.656.656 0 0 1-.642.518Zm4.726-1.014a.656.656 0 0 1-.464-1.12L17.147 6.642a.655.655 0 1 1 .928.928L7.82 17.825a.654.654 0 0 1-.464.192Z"
    />
    <path
      fill="currentColor"
      d="M2.63 19.031a.657.657 0 0 1-.138-1.298l4.726-1.014a.656.656 0 0 1 .275 1.284l-4.726 1.014a.642.642 0 0 1-.138.014Zm13.125-9.413a.654.654 0 0 1-.464-.192l-3.712-3.712a.656.656 0 1 1 .928-.928l3.712 3.712a.657.657 0 0 1-.464 1.12Zm1.856-1.855a.656.656 0 0 1-.464-1.12c.365-.366.566-.86.566-1.393 0-.532-.201-1.027-.566-1.392a1.952 1.952 0 0 0-1.393-.567c-.532 0-1.026.201-1.391.567a.658.658 0 0 1-1.071-.213.656.656 0 0 1 .143-.715 3.252 3.252 0 0 1 2.32-.951 3.26 3.26 0 0 1 2.32.95c.613.614.95 1.438.95 2.321 0 .883-.337 1.707-.95 2.32a.654.654 0 0 1-.464.193Z"
    />
  </svg>
);

const DotsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M10.5 8.531A1.971 1.971 0 0 0 8.531 10.5c0 1.085.884 1.969 1.969 1.969a1.971 1.971 0 0 0 1.969-1.969A1.971 1.971 0 0 0 10.5 8.531Zm-6.563 0A1.971 1.971 0 0 0 1.97 10.5c0 1.085.883 1.969 1.968 1.969a1.971 1.971 0 0 0 1.97-1.969 1.971 1.971 0 0 0-1.97-1.969Zm13.126 0a1.971 1.971 0 0 0-1.97 1.969c0 1.085.884 1.969 1.97 1.969A1.971 1.971 0 0 0 19.03 10.5a1.971 1.971 0 0 0-1.968-1.969Z"
    />
  </svg>
);
