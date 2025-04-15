import {ValueOf} from 'type-fest';

export const SenderOption = {
    ai: 'ai',
    me: 'me',
} as
const ;
export type Sender = ValueOf<typeof SenderOption>;

export type ConversationData = {
    msg?: string;
    sender: Sender;
    cta: boolean;
    responseDetails?: AIResponseDetail[];
    images?: OnImageSearchHandlerParam;
};

export type AIResponseDetail = {
    id: number;
    FULL_NAME: string;
    isExactMatch: boolean;
    DOB: string;
    ADDRESS: string;
    mobileNumbers: string[];
    emails: string[];
    FIRST:string;
    LAST:string;
    MID:string;
    HAIRCOLOR:string;
    EYECOLOR:string;
    HEIGHT:string;
    WEIGHT:string;
    RACE:string;
    GENDER:string;

};

export type OnImageSearchHandlerParam = { file?: File; url: string }[];
