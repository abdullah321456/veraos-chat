'use client';

import {ScrollToTop} from '@/components/atom/scroll-to-top';
import {Uploader} from './uploader';
import {Button} from '@/components/atom/button';
import {Input} from '@/components/atom/form-elements/input';
import {inputLabelStyles} from '@/components/atom/form-elements/styles/label-styles';
import {Textarea} from '@/components/atom/form-elements/textarea';
import cn from '@/lib/utils/cn';
import {useRouter} from 'next/navigation';
import {useSignupMultiStep} from '../utils';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FinalSubmissionFormInputType, FinalSubmissionFormSchema} from '../validation';
import {toast} from 'sonner';
import {useSignup} from '../../signup/context/signup.context';
import {useState, useEffect} from 'react';
import {apiService} from '@/services/apiService';
import {authUtils} from '@/lib/utils/auth';
import {ROUTES} from '@/config/routes';
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

export function FinalSubmissionForm() {
    const router = useRouter();
    const {handleNext} = useSignupMultiStep();
    const darkModeContext = useDarkMode();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
      if (typeof window === 'undefined') return false;
      const storageValue = getDarkModeFromStorage();
      const contextValue = darkModeContext.isDarkMode;
      return contextValue === true ? true : storageValue;
    });

    useEffect(() => {
      if (typeof window === 'undefined') return;
      const updateDarkMode = () => {
        const storageValue = getDarkModeFromStorage();
        const contextValue = darkModeContext.isDarkMode;
        const newValue = contextValue === true ? true : storageValue;
        setIsDarkMode(newValue);
      };
      updateDarkMode();
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'darkMode') updateDarkMode();
      };
      window.addEventListener('storage', handleStorageChange);
      const interval = setInterval(updateDarkMode, 50);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }, [darkModeContext.isDarkMode]);
    const {
        basicInfo,
        dataAccessInfo,
        finalSubmissionInfo,
        addDocument,
        removeDocument,
        setFinalSubmissionInfo
    } = useSignup();
    const [isUploading, setIsUploading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const form = useForm<FinalSubmissionFormInputType>({
        resolver: zodResolver(FinalSubmissionFormSchema),
        defaultValues: finalSubmissionInfo || {
            documents: [],
        },
        mode: 'onChange',
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors, isSubmitting},
    } = form;

    const documents = watch('documents');

    const handleDocumentUpload = (file: File) => {
        addDocument(file);
        setValue('documents', [...documents, file], {shouldValidate: true});
    };

    const handleDocumentRemove = (index: number) => {
        removeDocument(index);
        const newDocuments = documents.filter((_, i) => i !== index);
        setValue('documents', newDocuments, {shouldValidate: true});
    };

    async function onSubmit(inputs: FinalSubmissionFormInputType) {
        try {
            setIsUploading(true);
            const loadingToast = toast.loading('Uploading documents...');

            // Upload documents
            const formData = new FormData();
            documents.forEach((file) => {
                formData.append(`files`, file);
            });

            const uploadResponse = await apiService.postMultipartData('/files/upload', formData);
            const uploadedFileIds = uploadResponse.data || [];

            // Prepare registration data
            const registrationData = {
                ...basicInfo,
                ...dataAccessInfo,
                documents: uploadedFileIds,
            };

            // Register user
            const response = await apiService.postData('/users/register', registrationData);

            toast.dismiss(loadingToast);
            toast.success('Registration successful!');
            handleNext();
        } catch (error: any) {
            console.error('Registration error:', error);

            // Ensure we dismiss any loading toast first
            toast.dismiss();

            // Show error toast with proper configuration
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.', {
                duration: 5000,
                position: 'top-right',
            });
        } finally {
            setIsUploading(false);
        }
    }

    const isLoading = isUploading || isRegistering;

    return (
        <div className="space-y-6 sm:space-y-8 w-full max-w-[560px] mx-auto px-4 sm:px-6 md:px-0">
            <ScrollToTop/>

            {/* Document Upload Section */}
            <div className="p-4 sm:p-6 rounded-lg shadow-sm w-full" style={{ background: isDarkMode ? '#404652' : '#FFFFFF' }}>
                {/*<h3 className="text-base sm:text-lg font-semibold mb-4">Upload Required Documents</h3>*/}
                <Uploader
                    onUpload={handleDocumentUpload}
                    onRemove={handleDocumentRemove}
                    uploadedDocuments={documents}
                    error={errors.documents?.message}
                />
            </div>

            <div className="col-span-full flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="w-full sm:w-auto rounded-[8px] h-[36px] text-sm sm:text-base"
                >
                    Back
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading || !documents.length}
                    className={cn('w-full sm:w-auto rounded-[8px] h-[36px] text-sm sm:text-base', !documents.length && 'opacity-50 cursor-not-allowed')}
                    style={{ background: 'linear-gradient(113.07deg, #5C39D9 15.59%, #7B6FFF 64.93%)' }}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="animate-spin">⏳</span>
                            <span className="hidden sm:inline">{isUploading ? 'Uploading documents...' : 'Registering account...'}</span>
                            <span className="sm:hidden">{isUploading ? 'Uploading...' : 'Registering...'}</span>
            </span>
                    ) : documents.length ? (
                        'Submit for Review'
                    ) : (
                        <span className="text-xs sm:text-sm">Please upload at least one document</span>
                    )}
                </Button>
            </div>
        </div>
    );
}
