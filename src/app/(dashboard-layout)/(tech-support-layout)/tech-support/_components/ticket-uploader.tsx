import { Button } from "@/components/atom/button";
import { inputLabelStyles } from "@/components/atom/form-elements/styles/label-styles";
import cn from "@/lib/utils/cn";
import { fileToBase64 } from "@/lib/utils/file-to-base64";
import { useRef, useState, useTransition } from "react";
import { PiTrash } from "react-icons/pi";

const labelClassName = cn(
  "block text-[#6D6F73]",
  inputLabelStyles.color.black,
  inputLabelStyles.size.md,
  inputLabelStyles.weight.medium
);

export function TicketUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [fileOnBoard, setFileOnBoard] = useState<boolean>(false);

  function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
    startTransition(async () => {
      try {
        const base64 = await fileToBase64(selectedFile as File);
        setBase64Image(base64);
      } catch (error: unknown) {
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
    if (droppedFile) setImageFile(droppedFile);
    startTransition(async () => {
      try {
        const base64 = await fileToBase64(droppedFile as File);
        setBase64Image(base64);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setFileOnBoard(false);
      }
    });
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setFileOnBoard(false);
  }

  return (
    <div className="w-full mt-2">
      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setFileOnBoard(false)}
        onDrop={handleDrop}
        className={cn(
          "cursor-pointer duration-300 flex flex-col items-center border border-dashed border-primary rounded-lg p-4 py-3 bg-primary/10",
          fileOnBoard && "bg-primary/20"
        )}
        onClick={() => inputRef.current?.click()}>
        {!imageFile ? (
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-center max-w-[48ch] text-xs ">
              Drag & drop any files you want to attach
            </p>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleImageFileChange}
            />
          </div>
        ) : isPending ? (
          <p className="py-20 text-bold animate-pulse">Processing...</p>
        ) : (
          <div className="flex flex-col items-center gap-4 justify-between">
            {base64Image && (
              <img
                src={base64Image}
                alt="Uploaded Image"
                className="w-28 h-auto"
              />
            )}
            <Button
              size="sm"
              className="px-3 py-2"
              variant="outline"
              onClick={handleRemoveImage}>
              <PiTrash className="w-4 h-4 me-1" /> Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
