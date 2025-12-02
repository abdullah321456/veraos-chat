'use client';

import React, {useRef, useState, useTransition, useEffect} from 'react';
import {SearchInput} from './search-input';
import {SingleConversation} from './single-conversation';
import {AIResponseDetail, ConversationData, OnImageSearchHandlerParam, SenderOption} from './type';
import {apiService} from '@/services/apiService';
import {useSearchParams} from 'next/navigation';
import useQueryParams from '@/lib/hooks/use-query-params';
import { useMessageContext } from '@/app/(dashboard-layout)/(ai-search-layout)/client-layout';
import { toast } from 'sonner';
import { useModal } from '@/components/modal-views/use-modal';
import { Button } from '@/components/atom/button';
import { useUser } from '@/lib/hooks/use-user';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import Image from 'next/image';

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
        hits?: AIResponseDetail[];
    };
    isEntityFound: boolean;
    chat: string;
}

let previousText = "";

function LoadingDots() {
    return (
        <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#171137] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[#171137] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[#171137] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
    );
}

function TermsOfUseModal() {
    const { closeModal } = useModal();
    const [activeSection, setActiveSection] = useState<'terms' | 'privacy'>('terms');

    return (
        <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
            <h1 className="text-black text-[24px] font-bold text-center mb-8">
                Terms of Use & Acceptable Use Cases
            </h1>

            {/* Slider Button */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-full p-1 flex items-center">
                    <button
                        onClick={() => setActiveSection('terms')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeSection === 'terms'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Terms of Use
                    </button>
                    <button
                        onClick={() => setActiveSection('privacy')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeSection === 'privacy'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Privacy Policy
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {activeSection === 'terms' ? (
                    // Terms of Use Content
                    <>
                        {/* Introduction */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Introduction</h2>
                            <p className="text-black text-sm leading-relaxed">
                                By using Veraos, you agree to abide by these terms of use and acceptable use cases.
                                These terms govern your use of our AI-powered search and investigation platform.
                            </p>
                        </section>

                        {/* Acceptable Use Cases */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Acceptable Use Cases</h2>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-black text-base font-semibold mb-2">✅ Authorized Investigations</h3>
                                    <p className="text-black text-sm">
                                        Use for legitimate law enforcement, private investigation, background checks,
                                        and other authorized investigative purposes.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-black text-base font-semibold mb-2">✅ Compliance & Due Diligence</h3>
                                    <p className="text-black text-sm">
                                        Conducting compliance checks, due diligence for business transactions,
                                        and regulatory compliance activities.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-black text-base font-semibold mb-2">✅ Risk Assessment</h3>
                                    <p className="text-black text-sm">
                                        Assessing potential risks for business partnerships, employment,
                                        or other professional relationships.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-black text-base font-semibold mb-2">✅ Fraud Prevention</h3>
                                    <p className="text-black text-sm">
                                        Investigating potential fraud, identity theft, or other criminal activities
                                        for prevention and detection purposes.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Prohibited Uses */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Prohibited Uses</h2>
                            <div className="space-y-3">
                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                                    <h3 className="text-black text-base font-semibold mb-2">❌ Unauthorized Surveillance</h3>
                                    <p className="text-black text-sm">
                                        Using the platform for unauthorized surveillance, stalking, or harassment of individuals.
                                    </p>
                                </div>

                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                                    <h3 className="text-black text-base font-semibold mb-2">❌ Personal Vendettas</h3>
                                    <p className="text-black text-sm">
                                        Using the platform for personal vendettas, revenge, or non-professional purposes.
                                    </p>
                                </div>

                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                                    <h3 className="text-black text-base font-semibold mb-2">❌ Discrimination</h3>
                                    <p className="text-black text-sm">
                                        Using information obtained to discriminate against individuals based on protected characteristics.
                                    </p>
                                </div>

                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                                    <h3 className="text-black text-base font-semibold mb-2">❌ Data Resale</h3>
                                    <p className="text-black text-sm">
                                        Reselling, redistributing, or commercializing data obtained through the platform.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Legal Compliance */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Legal Compliance</h2>
                            <div className="space-y-3">
                                <p className="text-black text-sm leading-relaxed">
                                    Users must comply with all applicable laws and regulations, including but not limited to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-black text-sm">
                                    <li>Fair Credit Reporting Act (FCRA)</li>
                                    <li>Gramm-Leach-Bliley Act (GLBA)</li>
                                    <li>Health Insurance Portability and Accountability Act (HIPAA)</li>
                                    <li>State and local privacy laws</li>
                                    <li>International data protection regulations</li>
                                </ul>
                            </div>
                        </section>

                        {/* Consequences */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Consequences of Violation</h2>
                            <div className="space-y-3">
                                <p className="text-black text-sm leading-relaxed">
                                    Violation of these terms may result in:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-black text-sm">
                                    <li>Immediate account suspension or termination</li>
                                    <li>Legal action and potential civil or criminal penalties</li>
                                    <li>Reporting to relevant authorities</li>
                                    <li>Liability for damages caused by misuse</li>
                                </ul>
                            </div>
                        </section>
                    </>
                ) : (
                    // Privacy Policy Content
                    <>
                        {/* Privacy Introduction */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Privacy Policy</h2>
                            <p className="text-black text-sm leading-relaxed">
                                This Privacy Policy describes how Veraos collects, uses, and protects your personal information
                                when you use our AI-powered search and investigation platform.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Information We Collect</h2>
                            <div className="space-y-3">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-black text-base font-semibold mb-2">🔍 Search Queries</h3>
                                    <p className="text-black text-sm">
                                        We collect search queries and investigation parameters to provide relevant results
                                        and improve our services.
                                    </p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-black text-base font-semibold mb-2">👤 Account Information</h3>
                                    <p className="text-black text-sm">
                                        Name, email, organization details, and authentication credentials for account management.
                                    </p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-black text-base font-semibold mb-2">📊 Usage Analytics</h3>
                                    <p className="text-black text-sm">
                                        Platform usage patterns, feature interactions, and performance metrics to enhance user experience.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Information */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">How We Use Your Information</h2>
                            <div className="space-y-3">
                                <ul className="list-disc list-inside space-y-2 text-black text-sm">
                                    <li>Provide and maintain our investigation platform services</li>
                                    <li>Process and respond to your search queries and requests</li>
                                    <li>Improve platform functionality and user experience</li>
                                    <li>Ensure compliance with legal and regulatory requirements</li>
                                    <li>Protect against fraud, abuse, and security threats</li>
                                    <li>Communicate important updates and service notifications</li>
                                </ul>
                            </div>
                        </section>

                        {/* Data Protection */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Data Protection & Security</h2>
                            <div className="space-y-3">
                                <p className="text-black text-sm leading-relaxed">
                                    We implement comprehensive security measures to protect your data:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-black text-sm">
                                    <li>End-to-end encryption for all data transmission</li>
                                    <li>Secure data centers with 24/7 monitoring</li>
                                    <li>Regular security audits and penetration testing</li>
                                    <li>Access controls and authentication protocols</li>
                                    <li>Data backup and disaster recovery procedures</li>
                                    <li>Employee training on data protection practices</li>
                                </ul>
                            </div>
                        </section>

                        {/* Data Retention */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Data Retention</h2>
                            <div className="space-y-3">
                                <p className="text-black text-sm leading-relaxed">
                                    We retain your data only as long as necessary to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-black text-sm">
                                    <li>Provide our services and maintain your account</li>
                                    <li>Comply with legal and regulatory requirements</li>
                                    <li>Resolve disputes and enforce our agreements</li>
                                    <li>Improve our services and develop new features</li>
                                </ul>
                            </div>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-black text-lg font-bold mb-3">Your Privacy Rights</h2>
                            <div className="space-y-3">
                                <p className="text-black text-sm leading-relaxed">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-black text-sm">
                                    <li>Access and review your personal information</li>
                                    <li>Request correction of inaccurate data</li>
                                    <li>Request deletion of your personal information</li>
                                    <li>Opt-out of certain data processing activities</li>
                                    <li>Export your data in a portable format</li>
                                    <li>Lodge complaints with supervisory authorities</li>
                                </ul>
                            </div>
                        </section>
                    </>
                )}

                {/* Contact Information */}
                <section>
                    <h2 className="text-black text-lg font-bold mb-3">Contact Information</h2>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-black text-sm leading-relaxed">
                            If you have questions about these {activeSection === 'terms' ? 'terms' : 'privacy policies'} or need to report a violation,
                            please contact our {activeSection === 'terms' ? 'legal' : 'privacy'} team at{' '}
                            <span className="text-primary font-medium">
                {activeSection === 'terms' ? 'legal@veraos.io' : 'legal@veraos.io'}
              </span>
                        </p>
                    </div>
                </section>

                {/* Last Updated */}
                <section className="border-t pt-4">
                    <p className="text-gray-500 text-xs text-center">
                        Last updated: {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    </p>
                </section>
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t">
                <Button onClick={() => closeModal()} variant="outline" color="secondary" disableTitleCase>
                    Close
                </Button>
            </div>
        </div>
    );
}

export function Conversation() {
    // Helper function to check if the query is asking for help
    const isHelpQuery = (query: string): boolean => {
        const normalizedQuery = query.toLowerCase().trim();
        return normalizedQuery.includes('tin man') || 
               normalizedQuery.includes('tinman') ||
               normalizedQuery.includes('help me') || 
               normalizedQuery === 'help' ||
               normalizedQuery === 'tin man help me';
    };

    const [messages, setMessages] = useState<ConversationData[]>([]);
    const [conversationTitle, setConversationTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isExecutingQuery, setIsExecutingQuery] = useState(false);
    const [hasExecutedQuery, setHasExecutedQuery] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const executionId = useRef(Math.random().toString(36).substr(2, 9));
    
    // Safari mobile fix - only for scrollRef div
    useEffect(() => {
        if (typeof window !== 'undefined' && scrollRef.current) {
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || 
                            /iPhone|iPad|iPod/.test(navigator.userAgent);
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.innerWidth <= 768;
            
            if (isSafari && isMobile) {
                const scrollContainer = scrollRef.current;
                
                // Apply constraints to scrollRef div and its children
                const applyConstraints = () => {
                    if (scrollContainer) {
                        scrollContainer.style.overflowX = 'hidden';
                        scrollContainer.style.maxWidth = '100%';
                        scrollContainer.style.width = '100%';
                        
                        // Apply to all children
                        const children = scrollContainer.querySelectorAll('*');
                        children.forEach((child) => {
                            const el = child as HTMLElement;
                            el.style.maxWidth = '100%';
                            el.style.boxSizing = 'border-box';
                        });
                    }
                };
                
                // Handle scroll events on this container only
                const handleScroll = () => {
                    if (scrollContainer.scrollLeft !== 0) {
                        scrollContainer.scrollLeft = 0;
                    }
                };
                
                // Initial application
                applyConstraints();
                
                // Monitor for changes
                const observer = new MutationObserver(() => {
                    applyConstraints();
                });
                
                observer.observe(scrollContainer, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['style', 'class']
                });
                
                scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
                
                return () => {
                    observer.disconnect();
                    scrollContainer.removeEventListener('scroll', handleScroll);
                };
            }
        }
    }, []);
    
    console.log(`[${executionId.current}] Conversation component mounted/rendered`);
    const [, startImgInputTransition] = useTransition();
    const searchParams = useSearchParams();
    const chatId = searchParams.get('chatId');
    const query = searchParams.get('query');
    const { setQueryParams } = useQueryParams();
    const { onNewMessage, onNewChat } = useMessageContext();
    const { openModal } = useModal();
    const { userData } = useUser();
    const router = useRouter();

    const handleTermsClick = () => {
        openModal({
            view: <TermsOfUseModal />,
            containerClassName: 'w-full max-w-[800px] max-h-[90vh] overflow-hidden mx-4',
        });
    };

    const handleNewChat = async () => {
        try {
            console.log('Creating new chat from search input...');
            const response = await apiService.postData('/chat', {});
            const newChatId = response.data._id;
            console.log('New chat created with ID:', newChatId);
            
            // Notify sidebar about the new chat
            onNewChat(newChatId);
            
            // Clear current messages to show fresh start
            setMessages([{
                msg: (
                    <div>
                        Welcome to Overwatch. Begin your search using natural language—Overwatch understands context, not just keywords. If this is your first time using Overwatch say <strong>"Tin Man Help Me"</strong>.
                        <br />
                        <br />
                        Tap the icon below to watch a brief introduction to Overwatch.
                        <br />
                        <br />
                        <div className="flex justify-start">
                            <button 
                                onClick={() => {
                                    const modal = document.createElement('div');
                                    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                                    modal.innerHTML = `
                                        <div class="relative w-full max-w-full sm:max-w-4xl mx-2 sm:mx-4">
                                            <button 
                                                onclick="this.parentElement.parentElement.remove()" 
                                                class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10"
                                            >
                                                ×
                                            </button>
                                            <div class="relative w-full" style="padding-bottom: 56.25%;">
                                                <iframe 
                                                    src="https://www.youtube.com/embed/7s14tEmr2Nw?autoplay=1" 
                                                    class="absolute top-0 left-0 w-full h-full rounded-lg"
                                                    frameborder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowfullscreen>
                                                </iframe>
                                            </div>
                                        </div>
                                    `;
                                    document.body.appendChild(modal);
                                    modal.addEventListener('click', (e) => {
                                        if (e.target === modal) {
                                            modal.remove();
                                        }
                                    });
                                }}
                                className="relative block w-64 group"
                            >
                                <img 
                                    src="https://img.youtube.com/vi/7s14tEmr2Nw/maxresdefault.jpg" 
                                    alt="Overwatch Introduction Video" 
                                    className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                />
                                {/* Play icon overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black bg-opacity-60 rounded-full p-4 group-hover:bg-opacity-80 transition-all duration-200">
                                        <svg 
                                            className="w-8 h-8 text-white" 
                                            fill="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                ),
                sender: SenderOption.ai,
                cta: false
            }]);
            
            // Navigate to the new chat
            router.push(`${ROUTES.AI_SEARCH.INDEX}?chatId=${newChatId}`);
        } catch (error) {
            console.error('Error creating new chat:', error);
            toast.error('Failed to create new chat');
        }
    };

    const fetchMessages = async (id: string) => {
        setIsLoading(true);
        try {
            const response = await apiService.getData(`/chat/${id}/messages`);
            
            // Fetch chat details to get the title
            try {
                const chatDetails = await apiService.getData(`/chat`);
                const currentChat = chatDetails.data.find((chat: any) => chat._id === id);
                if (currentChat) {
                    setConversationTitle(currentChat.question_preview || 'Conversation');
                }
            } catch (error) {
                console.error('Error fetching chat details:', error);
                setConversationTitle('Conversation');
            }
            
            const mappedMessages = response.data.map((msg: ApiMessage) => {
                return {
                    msg: msg.message,
                    sender: msg.sender === 'me' ? SenderOption.me : SenderOption.ai,
                    cta: msg.cta,
                    responseDetails: msg.responseDetails ? JSON.parse(msg.responseDetails).map((detail: any) => ({
                        ...detail,
                        message: msg.message
                    })) : undefined
                };
            });

            // Check for "<strong>Tin Man Help Me</strong>" messages and add static responses
            const messagesWithHelpResponses: ConversationData[] = [];
            for (let i = 0; i < mappedMessages.length; i++) {
                const msg = mappedMessages[i];
                messagesWithHelpResponses.push(msg);
                
                // If this is a user message asking for help, add the static response
                if (msg.sender === SenderOption.me && typeof msg.msg === 'string' && isHelpQuery(msg.msg)) {
                    const firstName = userData?.firstName || "User";
                    
                    const handleShowMore = (query: string) => {
                        // Encode the query for URL
                        const encodedQuery = encodeURIComponent(query);
                        
                        // Navigate to the same tab with the query
                        const queryUrl = `${window.location.origin}/ai-search?query=${encodedQuery}`;
                        window.location.href = queryUrl;
                    };
                    
                    messagesWithHelpResponses.push({
                        msg: (
                            <div>
                                <p>Hello, {firstName}!</p>
                                <br />
                                <p>Here's how you can search using natural language:</p>
                                <br />
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-1 sm:gap-2 min-w-0">
                                        <span className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} className="flex-shrink-0" />
                                            <span className="text-xs sm:text-sm truncate">Find Jodi Arias in California; she's in her 40s.</span>
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Find Jodi Arias in California; she's in her 40s")}
                                            className="px-1.5 sm:px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-0.5 sm:gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Find Yarly Reyes he has brown eyes.
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Find Yarly Reyes he has brown eyes")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Whose phone number is (727) 504-2129?
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Whose phone number is (727) 504-2129")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Find Ghislaine Maxwell; she owns a Cadillac.
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Find Ghislaine Maxwell; she owns a Cadillac")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Whose email address is DonaldTrump@hotmail.com?
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Whose email address is DonaldTrump@hotmail.com")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Who lives at 523 Covena Ave, Modesto, CA 95354?
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Who lives at 523 Covena Ave, Modesto, CA 95354")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Whose IP address is 152.72.121.172?
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Whose IP address is 152.72.121.172")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Whose car is this VIN Number: 1GKFK66U95J223404
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Whose car is this VIN Number: 1GKFK66U95J223404")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Find Heather Kennedy who lives with Andy
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Find Heather Kennedy who lives with Andy")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="flex items-center gap-2">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} />
                                            Whose device is 7C0F9238-F328-4A72-8764-C4133F48F74B
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Whose device is 7C0F9238-F328-4A72-8764-C4133F48F74B")}
                                            className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-1 sm:gap-2 border-t-2 border-b-2 border-gray-200 py-2 min-w-0">
                                        <span className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                                            <Image src="/logo.png" alt="logo" width={17} height={17} className="flex-shrink-0" />
                                            <span className="text-xs sm:text-sm break-words">Find a Middle Eastern man, with black hair and brown eyes, who is 6 feet tall with a stocky build in their 30s who drives a Toyota Camry in Tennessee.</span>
                                        </span>
                                        <button 
                                            onClick={() => handleShowMore("Find a Middle Eastern man, with black hair and brown eyes, who is 6 feet tall with a stocky build in their 30s who drives a Toyota Camry in Tennessee.")}
                                            className="px-1.5 sm:px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-0.5 sm:gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Show Me
                                        </button>
                                    </div>
                                </div>
                                <br />
                                <p>You can also start simple, then add more details step-by-step:</p>
                                <br />
                                <p>Search for Joshua Jones</p>
                                <p>(Results appear then add additional context)</p>
                                <p>Limit to Delray Beach, Florida.</p>
                            </div>
                        ),
                        sender: SenderOption.ai,
                        cta: false,
                        responseDetails: undefined
                    });
                }
            }

            setMessages([{
                msg: (
                    <div>
                        Welcome to Overwatch. Begin your search using natural language—Overwatch understands context, not just keywords. If this is your first time using Overwatch say <strong>"Tin Man Help Me"</strong>.
                        <br />
                        <br />
                        Tap the icon below to watch a brief introduction to Overwatch.
                        <br />
                        <br />
                        <div className="flex justify-start">
                            <button 
                                onClick={() => {
                                    const modal = document.createElement('div');
                                    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                                    modal.innerHTML = `
                                        <div class="relative w-full max-w-full sm:max-w-4xl mx-2 sm:mx-4">
                                            <button 
                                                onclick="this.parentElement.parentElement.remove()" 
                                                class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10"
                                            >
                                                ×
                                            </button>
                                            <div class="relative w-full" style="padding-bottom: 56.25%;">
                                                <iframe 
                                                    src="https://www.youtube.com/embed/7s14tEmr2Nw?autoplay=1" 
                                                    class="absolute top-0 left-0 w-full h-full rounded-lg"
                                                    frameborder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowfullscreen>
                                                </iframe>
                                            </div>
                                        </div>
                                    `;
                                    document.body.appendChild(modal);
                                    modal.addEventListener('click', (e) => {
                                        if (e.target === modal) {
                                            modal.remove();
                                        }
                                    });
                                }}
                                className="relative block w-64 group"
                            >
                                <img 
                                    src="https://img.youtube.com/vi/7s14tEmr2Nw/maxresdefault.jpg" 
                                    alt="Overwatch Introduction Video" 
                                    className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                />
                                {/* Play icon overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black bg-opacity-60 rounded-full p-4 group-hover:bg-opacity-80 transition-all duration-200">
                                        <svg 
                                            className="w-8 h-8 text-white" 
                                            fill="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                ),
                sender: SenderOption.ai,
                cta: false
            }, ...messagesWithHelpResponses]);
            // Scroll to bottom only on initial load
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }, 100);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chatId) {
            // Only fetch messages if we're not currently executing a query
            // This prevents overwriting the optimistic message during query execution
            if (!isExecutingQuery) {
                fetchMessages(chatId);
            }
        } else {
            setMessages([]);
        }
        previousText=""
    }, [chatId, isExecutingQuery]);

    const executeQueryWithChatId = async (value: string, chatIdToUse: string) => {
        try {
            setIsSending(true);
            setIsExecutingQuery(true);
            let currentChatId = chatIdToUse;
            
            // Update query params to set the chatId
            setQueryParams({ chatId: currentChatId });

            // Add optimistic update for the user's message
            setMessages((prev) => [...prev, { msg: value, sender: SenderOption.me, cta: false }]);
            // Scroll after adding question
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }, 10);

            // Call the search API
            const searchResponse = await apiService.postData('/search-local', {
                text: value,
                chat: currentChatId,
                previous: previousText
            }) as SearchResponse;

            if (searchResponse.isEntityFound) {
                previousText = value;
            } else {
                previousText = `${previousText} ${value}`;
            }

            // Check if user typed a help query and replace with static response
            let responseMessage: string | React.ReactNode = searchResponse.data.message;
            let responseDetails = searchResponse.data?.hits ? searchResponse.data.hits.map((hit: any) => ({
                ...hit,
                message: searchResponse.data.message
            })) : undefined;

            if (isHelpQuery(value)) {
                const firstName = userData?.firstName || "User";
                
                const handleShowMore = (query: string) => {
                    // Encode the query for URL
                    const encodedQuery = encodeURIComponent(query);
                    
                    // Navigate to the same tab with the query
                    const queryUrl = `${window.location.origin}/ai-search?query=${encodedQuery}`;
                    window.location.href = queryUrl;
                };
                
                // Convert line breaks to JSX elements for proper rendering
                responseMessage = (
                    <div>
                        <p>Hello, {firstName}!</p>
                        <br />
                        <p>Here's how you can search using natural language:</p>
                        <br />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Find Jodi Arias in California; she's in her 40s.
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find Jodi Arias in California; she's in her 40s")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Find Yarly Reyes he has brown eyes.
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find Yarly Reyes he has brown eyes")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose phone number is (727) 504-2129?
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose phone number is (727) 504-2129")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Find Ghislaine Maxwell; she owns a Cadillac.
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find Ghislaine Maxwell; she owns a Cadillac")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose email address is DonaldTrump@hotmail.com?
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose email address is DonaldTrump@hotmail.com")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Who lives at 523 Covena Ave, Modesto, CA 95354?
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Who lives at 523 Covena Ave, Modesto, CA 95354")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose IP address is 152.72.121.172?
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose IP address is 152.72.121.172")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose car is this VIN Number: 1GKFK66U95J223404
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose car is this VIN Number: 1GKFK66U95J223404")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Find Heather Kennedy who lives with Andy
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find Heather Kennedy who lives with Andy")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose device is 7C0F9238-F328-4A72-8764-C4133F48F74B
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose device is 7C0F9238-F328-4A72-8764-C4133F48F74B")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2 border-t-2 border-b-2 border-gray-200 py-2 min-w-0">
                                <span className="flex items-center gap-2 min-w-0 flex-1">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} className="flex-shrink-0" />
                                    <span className="text-xs sm:text-sm break-words">Find a Middle Eastern man, with black hair and brown eyes, who is 6 feet tall with a stocky build in their 30s who drives a Toyota Camry in Tennessee.</span>
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find a Middle Eastern man, with black hair and brown eyes, who is 6 feet tall with a stocky build in their 30s who drives a Toyota Camry in Tennessee.")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                        </div>
                        <br />
                        <p>You can also start simple, then add more details step-by-step:</p>
                        <br />
                        <p>Search for Joshua Jones</p>
                        <p>(Results appear then add additional context)</p>
                        <p>Limit to Delray Beach, Florida.</p>
                    </div>
                );
                responseDetails = undefined; // No response details for help message
            }

            // Replace loading message with actual response
            setMessages((prev) => [
                ...prev.slice(0, -1), // Remove the loading message
                {
                    msg: responseMessage,
                    sender: SenderOption.ai,
                    cta: false,
                    responseDetails: responseDetails
                }
            ]);

            // Scroll to bottom after response
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }, 100);

            // Notify parent component about the new message
            onNewMessage?.({ chatId: currentChatId, message: value });

        } catch (error) {
            console.error('Error executing query:', error);
            toast.error('Failed to execute query');
            
            // Remove the user's message on error
            setMessages((prev) => prev.slice(0, -1));
        } finally {
            setIsSending(false);
            setIsExecutingQuery(false);
        }
    };

    // Auto-execute query if present in URL
    useEffect(() => {
        console.log(`[${executionId.current}] Query useEffect triggered:`, { query, hasExecutedQuery, chatId, timestamp: new Date().toISOString() });
        
        // Check if we're already processing this query globally
        const globalKey = `processing_query_${query}`;
        if (query && !hasExecutedQuery && !chatId && !(window as any)[globalKey]) {
            console.log(`[${executionId.current}] Executing query for the first time:`, query);
            (window as any)[globalKey] = true; // Set global flag
            setHasExecutedQuery(true); // Prevent duplicate execution
            setIsExecutingQuery(true);
            
            // Create new chat and execute query
            const createChatAndExecuteQuery = async () => {
                try {
                    console.log(`[${executionId.current}] Creating new chat for query:`, query);
                    const newChatResponse = await apiService.postData('/chat', {});
                    const newChatId = newChatResponse.data._id;
                    console.log(`[${executionId.current}] New chat created with ID:`, newChatId);
                    
                    // Update URL with new chatId
                    const url = new URL(window.location.href);
                    url.searchParams.set('chatId', newChatId);
                    window.history.replaceState({}, '', url.toString());
                    
                    // Update query params to ensure chatId is set
                    setQueryParams({ chatId: newChatId });
                    
                    // Notify sidebar about the new chat
                    onNewChat(newChatId);
                    
                    // Execute the query immediately with the confirmed chatId
                    try {
                        console.log(`[${executionId.current}] Executing query with chatId:`, newChatId);
                        // Execute the query directly with the new chatId
                        await executeQueryWithChatId(query, newChatId);
                        // Clear the query from URL after execution
                        const cleanUrl = new URL(window.location.href);
                        cleanUrl.searchParams.delete('query');
                        window.history.replaceState({}, '', cleanUrl.toString());
                        console.log(`[${executionId.current}] Query execution completed`);
                        
                        // Clear global flag
                        delete (window as any)[globalKey];
                    } catch (error) {
                        console.error('Error executing query:', error);
                    } finally {
                        setIsExecutingQuery(false);
                    }
                } catch (error) {
                    console.error('Error creating new chat:', error);
                    toast.error('Failed to create new chat');
                    setIsExecutingQuery(false);
                    // Clear global flag on error
                    delete (window as any)[globalKey];
                }
            };
            
            createChatAndExecuteQuery();
        }
    }, [query, chatId]);

    // Reset the query execution flag when query changes
    useEffect(() => {
        setHasExecutedQuery(false);
    }, [query]);

    const addMessage = async (value: string) => {
        try {
            setIsSending(true);
            let currentChatId = chatId;

            // If no chatId exists, create a new chat
            if (!currentChatId) {
                const newChatResponse = await apiService.postData('/chat', {});
                currentChatId = newChatResponse.data._id;
                if (!currentChatId) {
                    throw new Error('Failed to create new chat');
                }
                setQueryParams({ chatId: currentChatId });
            }

            // Add optimistic update for the user's message
            setMessages((prev) => [...prev, { msg: value, sender: SenderOption.me, cta: false }]);
            // Scroll after adding question
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }, 10);


            // Add loading message with animation
            setMessages((prev) => [...prev, { msg: <div className="flex items-center gap-1"><LoadingDots /></div>, sender: SenderOption.ai, cta: false }]);
            // Scroll after adding loading response
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }, 10);

            // Call the search API
            const searchResponse = await apiService.postData('/search-local', {
                text: value,
                chat: currentChatId,
                previous: previousText
            }) as SearchResponse;

            if (searchResponse.isEntityFound) {
                previousText = value;
            } else {
                previousText = `${previousText} ${value}`;
            }

            // Check if user typed a help query and replace with static response
            let responseMessage: string | React.ReactNode = searchResponse.data.message;
            let responseDetails = searchResponse.data?.hits ? searchResponse.data.hits.map((hit: any) => ({
                ...hit,
                message: searchResponse.data.message
            })) : undefined;

            if (isHelpQuery(value)) {
                const firstName = userData?.firstName || "User";
                
                const handleShowMore = (query: string) => {
                    // Encode the query for URL
                    const encodedQuery = encodeURIComponent(query);
                    
                    // Navigate to the same tab with the query
                    const queryUrl = `${window.location.origin}/ai-search?query=${encodedQuery}`;
                    window.location.href = queryUrl;
                };
                
                // Convert line breaks to JSX elements for proper rendering
                responseMessage = (
                    <div>
                        <p>Hello, {firstName}!</p>
                        <br />
                        <p>Here's how you can search using natural language:</p>
                        <br />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Find Jodi Arias in California; she's in her 40s.
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find Jodi Arias in California; she's in her 40s")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Find Yarly Reyes he has brown eyes.
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find Yarly Reyes he has brown eyes")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose phone number is (727) 504-2129?
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose phone number is (727) 504-2129")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Find Ghislaine Maxwell; she owns a Cadillac.
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find Ghislaine Maxwell; she owns a Cadillac")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose email address is DonaldTrump@hotmail.com?
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose email address is DonaldTrump@hotmail.com")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Who lives at 523 Covena Ave, Modesto, CA 95354?
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Who lives at 523 Covena Ave, Modesto, CA 95354")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose IP address is 152.72.121.172?
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose IP address is 152.72.121.172")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose car is this VIN Number: 1GKFK66U95J223404
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose car is this VIN Number: 1GKFK66U95J223404")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Find Heather Kennedy who lives with Andy
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find Heather Kennedy who lives with Andy")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} />
                                    Whose device is 7C0F9238-F328-4A72-8764-C4133F48F74B
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Whose device is 7C0F9238-F328-4A72-8764-C4133F48F74B")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                            <div className="flex items-center justify-between gap-2 border-t-2 border-b-2 border-gray-200 py-2 min-w-0">
                                <span className="flex items-center gap-2 min-w-0 flex-1">
                                    <Image src="/logo.png" alt="logo" width={17} height={17} className="flex-shrink-0" />
                                    <span className="text-xs sm:text-sm break-words">Find a Middle Eastern man, with black hair and brown eyes, who is 6 feet tall with a stocky build in their 30s who drives a Toyota Camry in Tennessee.</span>
                                </span>
                                <button 
                                    onClick={() => handleShowMore("Find a Middle Eastern man, with black hair and brown eyes, who is 6 feet tall with a stocky build in their 30s who drives a Toyota Camry in Tennessee.")}
                                    className="px-2 py-1 text-xs bg-[#5C39D91A] text-[#5C39D9] border border-primary rounded-[6px] hover:bg-primary hover:text-white transition-colors flex-shrink-0 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Show Me
                                </button>
                            </div>
                        </div>
                        <br />
                        <p>You can also start simple, then add more details step-by-step:</p>
                        <br />
                        <p>Search for Joshua Jones</p>
                        <p>(Results appear then add additional context)</p>
                        <p>Limit to Delray Beach, Florida.</p>
                    </div>
                );
                responseDetails = undefined; // No response details for help message
            }

            // Replace loading message with actual response
            setMessages((prev) => [
                ...prev.slice(0, -1), // Remove the loading message
                {
                    msg: responseMessage,
                    sender: SenderOption.ai,
                    cta: false,
                    responseDetails: responseDetails
                }
            ]);

            // Notify about new message
            onNewMessage({ chatId: currentChatId, message: value });

        } catch (error) {
            console.error('Error sending message:', error);
            // Revert the optimistic update on error
            setMessages((prev) => prev.slice(0, -1));
        } finally {
            setIsSending(false);
        }
    };

    function handleImageSearch(data: OnImageSearchHandlerParam) {
        try {
            // Add the user's image message
            setMessages((prev) => [...prev, { sender: SenderOption.me, cta: false, images: data }]);

            // Add loading message
            setMessages((prev) => [...prev, {
                msg: <div className="flex items-center gap-1"><LoadingDots /></div>,
                sender: SenderOption.ai,
                cta: false
            }]);

            // Scroll to bottom
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            }, 10);
        } catch (error) {
            console.error('Error handling image search:', error);
            toast.error('Failed to process image');
        }
    }


    console.log("previous = ",previousText)
    
    return (
        <div className="pr-1 sm:pr-4 md:pr-6 px-1 sm:px-4 md:px-0 w-full min-w-0 max-w-full overflow-x-hidden box-border">
            {/* Back button with conversation title for mobile - only show when chatId exists */}
            {chatId && (
                <div className="flex sm:hidden items-center gap-2 pb-3 border-b border-gray-200 mb-2" style={{background:"#F6F6F9"}}>
                    <button
                        onClick={() => router.push(ROUTES.AI_SEARCH.INDEX)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors min-w-0"
                    >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm font-medium truncate">
                            {conversationTitle || 'Conversation'}
                        </span>
                    </button>
                </div>
            )}
            <div ref={scrollRef}
                 className="h-[calc(100vh-200px)] sm:h-[calc(100vh-170px)] overflow-y-auto overflow-x-hidden flex flex-col space-y-2 sm:space-y-4 w-full min-w-0 max-w-full box-border">
                {isLoading || isExecutingQuery ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingDots />
                    </div>
                ) : (
                    <>
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
            <div className="pt-2 sm:pt-0 w-full min-w-0 max-w-full box-border overflow-x-hidden">
                <SearchInput onTextSearch={addMessage} startTransition={startImgInputTransition}
                             onImageSearch={handleImageSearch} onNewChat={handleNewChat}/>
                {/*<p className="pt-3 sm:pt-4 text-[10px] sm:text-xs text-gray-500 font-medium break-words">*/}
                {/*    By using Veraos, you agree to abide by our terms of use and acceptable use cases.&nbsp;*/}
                {/*    <button*/}
                {/*        onClick={handleTermsClick}*/}
                {/*        className="cursor-pointer underline text-primary hover:text-primary/80 transition-colors"*/}
                {/*    >*/}
                {/*        Read here for more information.*/}
                {/*    </button>*/}
                {/*</p>*/}
            </div>
        </div>
    );
}



