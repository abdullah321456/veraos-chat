'use client';
import { GallaryIcon } from '@/components/atom/icons/ai-search/gallary';
import { GrayStarIcon } from '@/components/atom/icons/ai-search/gray-star';
import { InstaIcon } from '@/components/atom/icons/ai-search/insta';
import { RedStarIcon } from '@/components/atom/icons/ai-search/red-star';
import cn from '@/lib/utils/cn';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { InputArrayDataCell } from '../../../_components/input-array-data-cell';
import { Accordion } from '../../_components/accordion';

type SocialAndWebProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

export function SocialAndWeb({ isEditable = false, isDrawer }: SocialAndWebProps) {
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
  }
  return (
    <Accordion
      translateButton={isEditable}
      title="Social and Web Presence"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className={cn(isDrawer?"grid gap-3 mt-3":"grid grid-cols-2 gap-3 mt-3")}>
        <InputArrayDataCell
          label="Social Media Profiles"
          editable={editable}
          onDone={(value) => console.log('value', value)}
          values={['Facebook: @john.doe', 'Instagram: @johndoe_official', 'LinkedIn: linkedin.com/in/johndoe']}
          valueClassName="text-sky-500"
          rowWrapperClassName="space-y-1.5"
          rowClassName="bg-transparent px-0 py-0"
        />
        <InputArrayDataCell
          label="Mentions in News or Blogs"
          editable={editable}
          onDone={(value) => console.log('value', value)}
          values={[
            'Mentioned in a local news article for participating in a community fundraiser (April 2023).',
            'Blog post interview about small business marketing tips on marketing experts.com (June 2021).',
          ]}
          rowWrapperClassName="space-y-1.5"
          rowClassName="bg-transparent px-0 py-0"
          rowTextClassName="font-medium"
        />
        <InputArrayDataCell
          label="Publicly Available Photos or Media"
          editable={editable}
          onDone={(value) => console.log('value', value)}
          values={[
            'Photos from public social media posts showing family trips, business events, and community activities.',
            'Media from news coverage of charity events and local business conferences.',
          ]}
          rowWrapperClassName="space-y-1.5"
          rowClassName="bg-transparent px-0 py-0"
          rowTextClassName="font-medium"
        />
        {/* right part */}
        <div className="border rounded-lg py-1.5 px-2.5">
          <p className="text-xs">Publicly Available Reviews & Articles</p>
          <div className="space-y-2 mt-2">
            <div>
              <div className="flex justify-between items-center">
                <p className="text-black text-xs font-normal leading-4">Yelp Review:</p>
                <Image src="/yelp.png" alt="yelp" width={66} height={27}  />
              </div>
              <p className="text-black font-medium text-xs leading-5">
                Louie Bossi&apos;s, 1032 E Las Olas Blvd, Fort Lauderdale, Florida 33301
              </p>
              <div className="flex gap-3 mt-3">
                <Image src="/shirt-men.png" alt="shirt-men" width={65} height={65} className='aspect-square' />
                <div className="space-y-1">
                  <h5 className="text-black text-base font-bold">John Smith</h5>
                  <p className="text-black text-xs font-medium">Potomac, MD</p>
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-1.5">
                      <InstaIcon />
                      <p className="text-[#616166] text-xs font-medium">150</p>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GrayStarIcon />
                      <p className="text-[#616166] text-xs font-medium">60</p>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <GallaryIcon />
                      <p className="text-[#616166] text-xs font-medium">42</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="flex items-center gap-1.5">
                  <RedStarIcon />
                  <RedStarIcon />
                  <RedStarIcon />
                  <RedStarIcon />
                  <RedStarIcon />
                </span>
                <p className="text-[#616166] text-xs font-medium">May 1, 2024.</p>
              </div>
              <p className="text-black font-medium text-xs leading-5">Great Food, I come here all the time!</p>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
}
