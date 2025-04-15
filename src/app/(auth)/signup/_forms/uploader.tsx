import { Button } from '@/components/atom/button';
import cn from '@/lib/utils/cn';
import { useRef, useState, useTransition } from 'react';
import { PiTrash } from 'react-icons/pi';
import { CloudIcon } from '../_components/icons';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { toast } from 'sonner';

const labelClassName = cn('block text-[#6D6F73]', inputLabelStyles.color.black, inputLabelStyles.size.md, inputLabelStyles.weight.medium);

interface UploaderProps {
  onUpload: (file: File) => void;
  onRemove: (index: number) => void;
  uploadedDocuments: File[];
  error?: string;
}

export function Uploader({ onUpload, onRemove, uploadedDocuments, error }: UploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [fileOnBoard, setFileOnBoard] = useState<boolean>(false);

  function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    startTransition(() => {
      try {
        // Return the file directly instead of converting to base64
        onUpload(selectedFile);
      } catch (error: unknown) {
        toast.error('Something went wrong');
        console.error(error);
      }
    });
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setFileOnBoard(true);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (!droppedFile) return;

    startTransition(() => {
      try {
        onUpload(droppedFile);
      } catch (error: unknown) {
        console.error(error);
        toast.error('Something went wrong');
      } finally {
        setFileOnBoard(false);
      }
    });
  }

  return (
    <div className="w-full mt-4">
      <p className={labelClassName}>Upload ID</p>
      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setFileOnBoard(false)}
        onDrop={handleDrop}
        className={cn(
          'cursor-grab duration-300 flex flex-col items-center border border-dashed border-primary rounded-lg p-4 py-10 bg-primary/10',
          fileOnBoard && 'bg-primary/20'
        )}
      >
        {uploadedDocuments.length === 0 ? (
          <div className="w-full flex flex-col items-center gap-2">
            <CloudIcon className="w-11 h-11" />
            <p className="font-bold text-sm">{fileOnBoard ? 'Drop the file here' : 'Upload ID'}</p>
            <p className="text-center max-w-[48ch] text-xs mb-2">Add ID by dragging and dropping here to uploading it from your desktop.</p>
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              ref={inputRef} 
              onChange={handleImageFileChange}
              accept="image/*,.pdf"
            />
            <Button
              onClick={() => inputRef.current?.click()}
              className="bg-white text-primary border-white border hover:border-primary duration-300 hover:bg-white"
            >
              Upload File
            </Button>
          </div>
        ) : isPending ? (
          <p className="py-20 text-bold animate-pulse">Processing...</p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {uploadedDocuments.map((doc, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm">{doc.name}</span>
                <Button size="sm" className="px-3 py-2" variant="outline" onClick={() => onRemove(index)}>
                  <PiTrash className="w-4 h-4 me-1" /> Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
