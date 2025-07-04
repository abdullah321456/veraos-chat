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
import {useState} from 'react';
import {apiService} from '@/services/apiService';
import {authUtils} from '@/lib/utils/auth';
import {ROUTES} from '@/config/routes';

export function FinalSubmissionForm() {
    const router = useRouter();
    const {handleNext} = useSignupMultiStep();
    const {
        basicInfo,
        dataAccessInfo,
        addDocument,
        removeDocument,
        setFinalSubmissionInfo
    } = useSignup();
    const [isUploading, setIsUploading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const form = useForm<FinalSubmissionFormInputType>({
        resolver: zodResolver(FinalSubmissionFormSchema),
        defaultValues: {
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

            // Save access token
            if (response.data?.access_token) {
                authUtils.setToken(response.data.access_token);
                // Set flag to indicate coming from registration
                sessionStorage.setItem('fromLogin', 'true');
            }

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
        <div className="space-y-8">
            <ScrollToTop/>

            {/* Document Upload Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Upload Required Documents</h3>
                <Uploader
                    onUpload={handleDocumentUpload}
                    onRemove={handleDocumentRemove}
                    uploadedDocuments={documents}
                    error={errors.documents?.message}
                />
            </div>

            <div className="col-span-full flex justify-end gap-3 pt-4">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                >
                    Back
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading || !documents.length}
                    className={!documents.length ? 'opacity-50 cursor-not-allowed' : ''}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
                            {isUploading ? 'Uploading documents...' : 'Registering account...'}
            </span>
                    ) : documents.length ? (
                        'Submit for Review'
                    ) : (
                        'Please upload at least one document'
                    )}
                </Button>
            </div>
        </div>
    );
}
