'use client';

import { Input } from '@/components/atom/form-elements/input';
import { fileToBase64 } from '@/lib/utils/file-to-base64';
import { trackAISearch } from '@/lib/gtag';
import { Send, Plus } from 'lucide-react';
import { SVGProps, TransitionStartFunction, useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { OnImageSearchHandlerParam } from './type';

type Props = {
  defaultValue?: string;
  onTextSearch?: (text: string) => void;
  onImageSearch?: (files: OnImageSearchHandlerParam) => void;
  onNewChat?: () => void;
  startTransition?: TransitionStartFunction;
};

export function SearchInput({ onTextSearch, onImageSearch, onNewChat, startTransition, defaultValue }: Props) {
  const [searchValue, setSearchValue] = useState(defaultValue || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Handle Safari mobile - only fix textarea itself, not global viewport
  useEffect(() => {
    if (typeof window !== 'undefined' && textareaRef.current) {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                      /iPhone|iPad|iPod/.test(navigator.userAgent);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.innerWidth <= 768;
      
      if (isSafari && isMobile) {
        const textarea = textareaRef.current;
        const form = formRef.current;
        const container = textarea.parentElement;
        
        // Apply constraints only to textarea and its immediate containers
        const applyConstraints = () => {
          if (textarea) {
            textarea.style.maxWidth = '100%';
            textarea.style.width = '100%';
            textarea.style.boxSizing = 'border-box';
          }
          if (form) {
            form.style.maxWidth = '100%';
            form.style.width = '100%';
          }
          if (container) {
            container.style.maxWidth = '100%';
            container.style.width = '100%';
          }
        };
        
        applyConstraints();
        
        // Apply on focus and input
        const handleFocus = () => applyConstraints();
        const handleInput = () => applyConstraints();
        
        textarea.addEventListener('focus', handleFocus);
        textarea.addEventListener('input', handleInput);
        
        return () => {
          textarea.removeEventListener('focus', handleFocus);
          textarea.removeEventListener('input', handleInput);
        };
      }
    }
  }, []);
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      // Track AI search event
      trackAISearch(searchValue, 0); // resultsCount will be updated when results come in
      onTextSearch?.(searchValue);
      setSearchValue('');
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files);

    startTransition?.(async () => {
      try {
        const processedFilesData = await Promise.all(
          selectedFiles.map(async (file) => ({
            url: await fileToBase64(file),
            file,
          }))
        );
        if (processedFilesData?.length) {
          onImageSearch?.(processedFilesData);
        }
      } catch (error: unknown) {
        console.error(error);
        toast.error('Something went wrong');
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex justify-between gap-1 sm:gap-2 w-full min-w-0 box-border max-w-full">
      <div 
        className="w-full min-w-0 max-w-full rounded-[14px] overflow-hidden relative box-border"
        style={{ background: 'linear-gradient(90deg, rgba(92, 57, 217, 0.1) 0%, rgba(197, 31, 160, 0.1) 100%)' }}
      >
        <textarea
          ref={textareaRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as any);
            }
          }}
          placeholder="Ask me anything.... "
          className="w-full min-h-[125px] sm:min-h-[98px] px-2 sm:px-4 py-3 pr-10 sm:pr-16 text-base sm:text-base bg-transparent border-0 focus:outline-none resize-none rounded-[14px] box-border max-w-full"
          rows={1}
          style={{ fontSize: '16px' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
        <button
          type="submit"
          className="absolute right-1 sm:right-3 bottom-1 sm:bottom-3 bg-primary text-white p-1.5 sm:p-2 rounded-full hover:bg-primary-dark duration-300 flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]" />
        </button>
      </div>
    </form>
  );
}

const ImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      fill="currentColor"
      d="m2.15 15.841-.016.017a5.156 5.156 0 0 1-.425-1.667 5.1 5.1 0 0 0 .441 1.65ZM7.5 8.65a1.983 1.983 0 1 0 0-3.967 1.983 1.983 0 0 0 0 3.967Z"
    />
    <path
      fill="currentColor"
      d="M13.492 1.667H6.509c-3.034 0-4.842 1.808-4.842 4.841v6.984c0 .908.158 1.7.467 2.366.716 1.584 2.25 2.475 4.375 2.475h6.983c3.033 0 4.842-1.808 4.842-4.841V6.508c0-3.033-1.809-4.841-4.842-4.841Zm3.483 8.75c-.65-.559-1.7-.559-2.35 0l-3.466 2.975c-.65.558-1.7.558-2.35 0l-.284-.234c-.591-.516-1.533-.566-2.2-.117L3.21 15.133a4.445 4.445 0 0 1-.292-1.641V6.508c0-2.35 1.242-3.591 3.592-3.591h6.983c2.35 0 3.592 1.241 3.592 3.591v4l-.109-.091Z"
    />
  </svg>
);
