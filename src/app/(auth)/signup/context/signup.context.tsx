'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { SignupFormInputType, DataAccessFormInputType, FinalSubmissionFormInputType } from '../validation';

interface SignupContextType {
  basicInfo: SignupFormInputType | null;
  dataAccessInfo: DataAccessFormInputType | null;
  finalSubmissionInfo: FinalSubmissionFormInputType | null;
  documents: File[];
  setBasicInfo: (info: SignupFormInputType) => void;
  setDataAccessInfo: (info: DataAccessFormInputType) => void;
  setFinalSubmissionInfo: (info: FinalSubmissionFormInputType) => void;
  addDocument: (document: File) => void;
  removeDocument: (index: number) => void;
  clearSignupData: () => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function SignupProvider({ children }: { children: ReactNode }) {
  const [basicInfo, setBasicInfoState] = useState<SignupFormInputType | null>(null);
  const [dataAccessInfo, setDataAccessInfoState] = useState<DataAccessFormInputType | null>(null);
  const [finalSubmissionInfo, setFinalSubmissionInfoState] = useState<FinalSubmissionFormInputType | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);

  const setBasicInfo = (info: SignupFormInputType) => {
    setBasicInfoState(info);
    localStorage.setItem('basicInfo', JSON.stringify(info));
  };

  const setDataAccessInfo = (info: DataAccessFormInputType) => {
    setDataAccessInfoState(info);
    localStorage.setItem('dataAccessNeeds', JSON.stringify(info));
  };

  const setFinalSubmissionInfo = (info: FinalSubmissionFormInputType) => {
    setFinalSubmissionInfoState(info);
    localStorage.setItem('finalSubmissionInfo', JSON.stringify(info));
  };

  const addDocument = (document: File) => {
    setDocuments(prev => [...prev, document]);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const clearSignupData = () => {
    setBasicInfoState(null);
    setDataAccessInfoState(null);
    setFinalSubmissionInfoState(null);
    setDocuments([]);
    localStorage.removeItem('basicInfo');
    localStorage.removeItem('dataAccessNeeds');
    localStorage.removeItem('finalSubmissionInfo');
  };

  return (
    <SignupContext.Provider
      value={{
        basicInfo,
        dataAccessInfo,
        finalSubmissionInfo,
        documents,
        setBasicInfo,
        setDataAccessInfo,
        setFinalSubmissionInfo,
        addDocument,
        removeDocument,
        clearSignupData,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
} 