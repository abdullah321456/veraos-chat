'use client';

import { FadeAnimation } from "@/components/atom/fade-animatation";
import { BookIcon } from "@/components/atom/icons/help-center/book";
import { MessengerIcon } from "@/components/atom/icons/help-center/messenger";
import { PopularArticles } from "@/components/popular-articles/popular-articles";
import { useDarkMode } from "@/lib/contexts/dark-mode-context";

export default function Page(props: unknown) {
  const { isDarkMode } = useDarkMode();
  console.log(props);

  const headingColor = isDarkMode ? '#FFFFFF' : '#000000';
  const cardBg = isDarkMode ? '#505662' : 'white';
  const cardTextColor = isDarkMode ? '#FFFFFF' : '#000000';
  const cardSubtextColor = isDarkMode ? '#A7A7A7' : '#504C4C';
  const iconBg = isDarkMode ? 'rgba(92, 57, 217, 0.2)' : 'rgba(92, 57, 217, 0.1)';

  return (
    <div className="w-full max-w-full sm:max-w-[424px] mx-auto">
      <FadeAnimation>
        <h1 
          className="text-[20px] font-bold text-center my-6"
          style={{ color: headingColor }}
        >
          Help Center
        </h1>
        <h5 
          className="text-base font-bold text-center"
          style={{ color: headingColor }}
        >
          How can we help you?
        </h5>

        <div className="grid grid-cols-2 gap-4 items-center my-6 w-full max-w-full sm:max-w-[420px]">
          <div 
            className="rounded-[10px] shadow-lg py-[14px] px-[25px] text-center flex flex-col items-center"
            style={{ backgroundColor: cardBg }}
          >
            <div 
              className="rounded-full p-3 w-11 h-11 flex items-center"
              style={{ backgroundColor: iconBg }}
            >
              <BookIcon style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
            </div>
            <h5 
              className="text-xs font-medium mt-[14px] mb-2"
              style={{ color: cardTextColor }}
            >
              Getting Started Guide
            </h5>
            <p 
              className="text-[10px] font-normal leading-[14px]"
              style={{ color: cardSubtextColor }}
            >
              Learn how to set up your profile and use key features to get
              started quickly.
            </p>
          </div>
          <div 
            className="rounded-[10px] shadow-lg py-[14px] px-[25px] text-center flex flex-col items-center h-[150px]"
            style={{ backgroundColor: cardBg }}
          >
            <div 
              className="rounded-full p-3 w-11 h-11 flex items-center"
              style={{ backgroundColor: iconBg }}
            >
              <MessengerIcon className="w-5" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
            </div>
            <h5 
              className="text-xs font-medium mt-[14px] mb-2"
              style={{ color: cardTextColor }}
            >
              Getting Started Guide
            </h5>
            <p 
              className="text-[10px] font-normal leading-[14px]"
              style={{ color: cardSubtextColor }}
            >
              Reach out for help via email, live chat, or support tickets.
            </p>
          </div>
        </div>
        <PopularArticles />
      </FadeAnimation>
    </div>
  );
}
