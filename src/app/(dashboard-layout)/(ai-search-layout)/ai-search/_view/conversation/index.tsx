'use client';

import {useRef, useState, useTransition, useEffect} from 'react';
import {SearchInput} from './search-input';
import {SingleConversation} from './single-conversation';
import {AIResponseDetail, ConversationData, OnImageSearchHandlerParam, SenderOption} from './type';
import {apiService} from '@/services/apiService';
import {useSearchParams} from 'next/navigation';

interface ApiMessage {
    _id: string;
    chat: string;
    cta: boolean;
    responseDetails: string;
    message: string;
    sender: 'me' | 'ai';
    createdAt: string;
    __v: number;
}

interface ApiResponse {
    data: ApiMessage[];
}

interface SearchResponse {
    data: {
        message: string;
    };
    isEntityFound: boolean;
    chat: string;
}

let previousText = "";


export function Conversation() {
    const [messages, setMessages] = useState<ConversationData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [, startImgInputTransition] = useTransition();
    const searchParams = useSearchParams();
    const chatId = searchParams.get('chatId');

    const fetchMessages = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await apiService.getData(`/chat/${id}/messages`);
            const mappedMessages = response.data.map((msg: ApiMessage) => ({
                msg: msg.message,
                sender: msg.sender === 'me' ? SenderOption.me : SenderOption.ai,
                cta: msg.cta,
                responseDetails: msg.responseDetails ? JSON.parse(msg.responseDetails) : undefined
            }));
            setMessages(mappedMessages.reverse());
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chatId) {
            fetchMessages(chatId);
        }
    }, [chatId]);

    function scrollToTop() {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    const addMessage = async (value: string) => {
        if (!chatId) return;

        try {
            setIsSending(true);
            // Add optimistic update for the user's message
            setMessages((prev) => [{msg: value, sender: SenderOption.me, cta: false}, ...prev]);
            scrollToTop();

            // Call the search API
            const searchResponse = await apiService.postData('/search-local', {
                text: value,
                chat: chatId,
                previous: previousText
            }) as SearchResponse;


            if (searchResponse.isEntityFound) {
                previousText = value
            }
            // } else if (searchResponse.isQuestion) {
            //     previoudText = '';
            // }
            else {
                previousText = `${previousText} ${value}`
            }


            // Add the AI's response to the messages
            setMessages((prev) => [
                {
                    msg: searchResponse.data.message,
                    sender: SenderOption.ai,
                    cta: !searchResponse.isEntityFound
                },
                ...prev
            ]);
            scrollToTop();

            // Fetch the updated messages to ensure consistency
            await fetchMessages(chatId);
        } catch (error) {
            console.error('Error sending message:', error);
            // Revert the optimistic update on error
            setMessages((prev) => prev.slice(1));
        } finally {
            setIsSending(false);
        }
    };

    function handleImageSearch(data: OnImageSearchHandlerParam) {
        const DUMMY_SENDER = messages.length % 2 === 0 ? SenderOption.ai : SenderOption.me;
        setMessages((prev) => [{sender: DUMMY_SENDER, cta: false, images: data}, ...prev]);
        scrollToTop();
    }

    return (
        <div className="pr-6">
            <div ref={scrollRef}
                 className="h-[calc(100vh-176px)] overflow-y-auto flex flex-col-reverse space-y-reverse space-y-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {isSending && (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                        )}
                        {messages.map((item, index) => (
                            <SingleConversation
                                key={index}
                                sender={item.sender}
                                message={item.msg}
                                cta={item.cta}
                                aiResponseDetails={item.responseDetails}
                                images={item.images}
                            />
                        ))}
                    </>
                )}
            </div>
            <SearchInput onTextSearch={addMessage} startTransition={startImgInputTransition}
                         onImageSearch={handleImageSearch}/>
            <p className="pt-4 text-xs text-gray-500 font-medium">
                By using Veraos, you agree to abide by our terms of use and acceptable use cases.&nbsp;
                <span className="cursor-pointer underline text-primary">Read here for more information.</span>
            </p>
        </div>
    );
}
