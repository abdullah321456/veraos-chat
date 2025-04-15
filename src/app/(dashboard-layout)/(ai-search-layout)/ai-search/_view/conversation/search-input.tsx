'use client';

import { Input } from '@/components/atom/form-elements/input';
import { fileToBase64 } from '@/lib/utils/file-to-base64';
import { Send } from 'lucide-react';
import { SVGProps, TransitionStartFunction, useState } from 'react';
import { toast } from 'sonner';
import { OnImageSearchHandlerParam } from './type';

type Props = {
  defaultValue?: string;
  onTextSearch?: (text: string) => void;
  onImageSearch?: (files: OnImageSearchHandlerParam) => void;
  startTransition?: TransitionStartFunction;
};

export function SearchInput({ onTextSearch, onImageSearch, startTransition, defaultValue }: Props) {
  const [searchValue, setSearchValue] = useState(defaultValue || '');
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
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
    <form onSubmit={handleSubmit} className="flex justify-between">
      <Input
        prefix={
          <label htmlFor="file" className="text-gray-500 cursor-pointer">
            {/*<input type="file" id="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />*/}
            {/*<ImageIcon className="w-5 h-5" />*/}
          </label>
        }
        rounded="pill"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Ask me anything.... "
        className="w-[calc(100%-64px)] "
        inputClassName="h-12 bg-gray-100"
      />
      <button
        type="submit"
        className="min-w-12 max-w-12 aspect-square bg-primary text-white p-2 rounded-full hover:bg-primary-dark duration-300"
      >
        <Send className="w-5 relative -right-1" />
      </button>
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
