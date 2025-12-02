import { FadeAnimation } from "@/components/atom/fade-animatation";
import { BookIcon } from "@/components/atom/icons/help-center/book";
import { MessengerIcon } from "@/components/atom/icons/help-center/messenger";
import { PopularArticles } from "@/components/popular-articles/popular-articles";

export default function Page(props: unknown) {
  console.log(props);

  return (
    <div className="w-full max-w-full sm:max-w-[424px] mx-auto">
      <FadeAnimation>
        <h1 className="text-black text-[20px] font-bold text-center my-6">
          Help Center
        </h1>
        <h5 className="text-black text-base font-bold text-center">
          How can we help you?
        </h5>

        <div className="grid grid-cols-2 gap-4 items-center my-6 w-full max-w-full sm:max-w-[420px]">
          <div className="rounded-[10px] shadow-lg py-[14px] px-[25px] text-center flex flex-col items-center ">
            <div className="rounded-full bg-[#5C39D9] bg-opacity-10 p-3 w-11 h-11 flex items-center">
              <BookIcon  />
            </div>
            <h5 className="text-black text-xs font-medium mt-[14px] mb-2">
              Getting Started Guide
            </h5>
            <p className="text-[#504C4C] text-[10px] font-normal leading-[14px]">
              Learn how to set up your profile and use key features to get
              started quickly.
            </p>
          </div>
          <div className="rounded-[10px] shadow-lg py-[14px] px-[25px] text-center flex flex-col items-center  h-[150px]">
            <div className="rounded-full bg-[#5C39D9] bg-opacity-10 p-3 w-11 h-11 flex items-center">
              <MessengerIcon className="w-5" />
            </div>
            <h5 className="text-black text-xs font-medium mt-[14px] mb-2">
              Getting Started Guide
            </h5>
            <p className="text-[#504C4C] text-[10px] font-normal leading-[14px]">
              Reach out for help via email, live chat, or support tickets.
            </p>
          </div>
        </div>
        <PopularArticles />
      </FadeAnimation>
    </div>
  );
}
