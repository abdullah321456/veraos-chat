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
    message:any;
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
    Address:any;
    ZIP:any;
    ZIP4:any;
    ZIP5:any;
    Zip:any;
    zip:any;
    Zi :any,
    ZI :any,
    IP:any,
    Address2:any;
    familyMembers:any
    N_ADDRESS:any
    N_CITY:any
    N_STATE:any
    N_ZIP:any
    criminals_small:any
    criminals:any
    email_master:any;
    CELL_PHONE:any,
    HOME_PHONE:any,
    PHONE1:any,
    PHONE2:any,
    _index:any;
    VETERAN:any;
    VIOLATIONS:any;
    ACCIDENTS:any;
    SMOKER:any;
    Marital_Status:any;
    Gender:any;
    Income:any;
    INCOME:any;
    LIC_NUMBER:any;
    LIC_STATE:any;
    HOMEOWNER:any;
    OWN_RENT:any;
    ETHNICITY:any;
    DOD:any;
    MilitaryService:any;
    dob_master:any;
    Known_Addresses:any;
    Known_PHONE:any;
    Know_Emails:any;
    Known_IPAddresses:any;
    CASENUMBER:any;
    ArrestingAgency:any;
    PhotoName:any;
    SOCIAL_LINK:any;
    criminals:any;
    devices:any;
    DEVICE_ID:any;
    Education_Records:any;
    Employment_Records:any;
    Death_Record:any;
    PhoneNumber:any;
};

export type OnImageSearchHandlerParam = { file?: File; url: string }[];
