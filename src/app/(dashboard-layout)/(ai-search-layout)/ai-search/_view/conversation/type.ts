import {ValueOf} from 'type-fest';
import { ReactNode } from 'react';

export const SenderOption = {
    ai: 'ai',
    me: 'me',
} as const;
export type Sender = ValueOf<typeof SenderOption>;

export type ConversationData = {
    msg?: string | ReactNode;
    sender: Sender;
    cta: boolean;
    responseDetails?: AIResponseDetail[];
    images?: OnImageSearchHandlerParam;
};

export type AIResponseDetail = {
    id: number;
    PHONE:string,
    FULL_NAME: string;
    isExactMatch: boolean;
    DOB: string;
    ADDRESS: string;
    mobileNumbers: string[];
    emails: string[];
    FIRST: string;
    LAST: string;
    MID: string;
    HAIRCOLOR: string;
    EYECOLOR: string;
    HEIGHT: string;
    WEIGHT: string;
    RACE: string;
    GENDER: string;
    STATE?: string;
    CITY?: string;
    ST?: string;
    State?: string;
    City?: string;
    education?: any ;
    rv?: any ;
    motorcycles?: any;
    automobile?: any;
    national_drivers_license?:any;
    bankruptcy?: any;
    foreign_movers?: any;
    cell_records?: any;
    drunk_drivings?: any;
    voip?: any;
    vets?:any;
    ScarsMarks:any;
    SkinTone:any;
    AKA1:any;
    AKA2:any;
    MARITALSTA:any
    ADDRESS1:any;
    ADDRESS2:any;
    Address1:any;
    address:any;
    ZIP:any;
    ZIP4:any;
    ZIP5:any;
    Zip:any;
    zip:any;
};

export type OnImageSearchHandlerParam = { file?: File; url: string }[];
