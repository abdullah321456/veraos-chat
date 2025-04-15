'use client';

import {Button} from '@/components/atom/button';
import {CountryIcon} from '@/components/atom/icons/ai-search/country';
import {CrossIcon} from '@/components/atom/icons/ai-search/cross';
import {ExclamationIcon} from '@/components/atom/icons/ai-search/exclamation';
import {LocationIcon} from '@/components/atom/icons/ai-search/location';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {LogBookEntries} from './logbox-entries';

import {ROUTES} from '@/config/routes';
import useQueryParams from '@/lib/hooks/use-query-params';
import {parsePathnameWithQuery} from '@/lib/utils/parse-pathname-with-query';
import {useRouter} from 'next-nprogress-bar';
import {DossierAssistantTop} from '../../../build/_view/dossier-assistant-top';
import {AuditTrail} from './audit-trail';
import {DossierCollaboration} from './dossier-collaboration';
import {Notes} from './notes';
import {UserActivityTracking} from './user-activity-tracking';
import {VersionHistory} from './version-history';

import {ConfirmModal} from '@/components/atom/confirm-modal';
import {useModal} from '@/components/modal-views/use-modal';
import cn from '@/lib/utils/cn';
import {PiTrash} from 'react-icons/pi';
import {toast} from 'sonner';
import {AiDriven} from './ai-driven';
import {AssociationsConnection} from './associations-connection';
import {CitizenesAbroad} from './citizenes-abroad';
import {ConsumerInfo} from './consumer-info';
import {CriminalAndLegal} from './criminal-legal-history';
import {DeviceInfo} from './device-info';
import {Education} from './education';
import {Employment} from './employment';
import {FinancialBackground} from './financial-background';
import {GeospatialTrace} from './geospatial-trace';
import {HighRisk} from './high-risk';
import {IdentificationAndContact} from './identification-contact-info';
import {PersonalAppearanceProfile} from './personal-appearance-profile';
import {PersonalInfo} from './personal-info';
import {PhotographicArchive} from './photographic-archive';
import {SocialAndWeb} from './social-web';
import {ThreatAssessment} from './threat-assessment';
import {VehicleOwnership} from './vehicle-ownership';
import {AIResponseDetail} from "../../../_view/conversation/type";

type Props = {
    editable?: boolean;
    isDrawer?: boolean;
    details?: AIResponseDetail
};

export function FullReport({editable = false, isDrawer, details}: Props) {
    const {queryParams} = useQueryParams();
    const pathname = usePathname();
    const router = useRouter();
    const {openModal, closeModal} = useModal();

    const isDossierAssistantTop = pathname === ROUTES.AI_SEARCH.BUILD;

    const buildPathname = parsePathnameWithQuery(ROUTES.AI_SEARCH.BUILD, queryParams);

    function handleCloseFullReport() {
        // router.push(parsePathnameWithQuery(ROUTES.AI_SEARCH.INDEX, { ...queryParams, open_current_record_drawer: 'true' }));
        if (typeof window !== 'undefined') {
            window.location.href = parsePathnameWithQuery(ROUTES.AI_SEARCH.INDEX, {
                ...queryParams,
                open_current_record_drawer: 'true'
            });
        }
    }

    function handleArchive() {
        openModal({
            view: (
                <ConfirmModal
                    icon={<PiTrash className="w-8 h-8"/>}
                    title="Archive Report"
                    description="Are you sure you want to archive this report?"
                    onConfirm={() => {
                        toast.success('Report Successfully Archived');
                        closeModal();
                    }}
                    cancelButtonText="Cancel"
                />
            ),
            containerClassName: ConfirmModal.containerClassName,
        });
    }

    return (
        <div className={cn('p-6 border border-gray-50 rounded-[10px] w-full mx-auto mr-3', isDrawer && 'p-4 mr-0')}>
            {!isDrawer && (
                <>
                    {isDossierAssistantTop ? (
                        <>
                            <DossierAssistantTop/>
                        </>
                    ) : (
                        <>
                            <div
                                className="flex items-center justify-between border-b border-b-gray-300 -mx-6 px-6 pb-6">
                                <h4 className="text-black text-[22px] font-bold">Full Report</h4>
                                <CrossIcon onClick={handleCloseFullReport} className="cursor-pointer"/>
                            </div>
                        </>
                    )}
                </>
            )}

            <div className={cn('flex justify-between mt-4', isDrawer && 'mt-0')}>
                <div className="flex gap-6 items-center">
                    <Image src="/men.png" alt="men" width={124} height={124}
                           className={cn('w-[124px] aspect-square h-auto', isDrawer && 'w-24')}/>
                    <div className=" w-[140px] space-y-1.5">
                        <h1 className="text-black text-lg font-bold leading-6">{details?.FULL_NAME}</h1>
                        <div className="flex items-center gap-1">
                            <LocationIcon/>
                            <p className="text-[#616166] text-xs font-normal">International Fugitive</p>
                        </div>

                        {pathname !== ROUTES.AI_SEARCH.BUILD &&
                        <Button onClick={() => router.push(buildPathname)}>Build Dossier</Button>}
                    </div>
                </div>
                <div className="flex gap-3">
          <span>
            <CountryIcon/>
          </span>
                    <ExclamationIcon className="mt-2 hover:cursor-pointer"/>
                </div>
            </div>
            {/* {editable && (
        <div className="flex justify-end">
          <Button onClick={handleArchive} size="sm" variant="outline" color="danger">
            <PiTrash className="w-3.5 h-3.5 me-1" /> Archive
          </Button>
        </div>
      )} */}
            <div className={cn('pt-4 space-y-4', isDrawer && 'block')}>
                <ThreatAssessment isEditable={editable}/>
                <PersonalInfo isEditable={editable} isDrawer={isDrawer} details={details}/>
                <PersonalAppearanceProfile isEditable={editable} isDrawer={isDrawer}/>
                <IdentificationAndContact isEditable={editable} isDrawer={isDrawer}/>
                <AssociationsConnection isEditable={editable} isDrawer={isDrawer}/>
                <CitizenesAbroad isEditable={editable}/>
                <VehicleOwnership isEditable={editable} isDrawer={isDrawer}/>
                <Employment isEditable={editable} isDrawer={isDrawer}/>
                <Education isEditable={editable} isDrawer={isDrawer}/>
                <FinancialBackground isEditable={editable} isDrawer={isDrawer}/>
                <ConsumerInfo isEditable={editable} isDrawer={isDrawer}/>
                <SocialAndWeb isEditable={editable} isDrawer={isDrawer}/>
                <PhotographicArchive isEditable={editable} isDrawer={isDrawer}/>
                <DeviceInfo isEditable={editable} isDrawer={isDrawer}/>
                <CriminalAndLegal isEditable={editable} isDrawer={isDrawer}/>
                <HighRisk isEditable={editable} isDrawer={isDrawer}/>
                <GeospatialTrace isEditable={editable} isDrawer={isDrawer}/>
                <AiDriven isEditable={editable} isDrawer={isDrawer}/>
                <LogBookEntries isEditable={editable} isDrawer={isDrawer}/>
                <Notes isEditable={editable}/>
                <DossierCollaboration isEditable={editable} isDrawer={isDrawer}/>
                <UserActivityTracking/>
                <VersionHistory/>
                <AuditTrail/>
                {/* <Collapse duration={300} header={({ toggle }) => <p onClick={toggle}>Column header</p>}>
          <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, necessitatibus?</h1>
        </Collapse> */}
                {/* <PersonalInformation /> */}

                {editable && (
                    <div className="flex justify-start">
                        <Button onClick={handleArchive} size="sm" variant="outline" color="danger">
                            <PiTrash className="w-3.5 h-3.5 me-1"/> Archive
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
