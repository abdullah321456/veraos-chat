import { cookies } from "next/headers";
import { IsExpandedType } from "../hooks/use-sidebar-expand";

export function getIsSidebarExpandedOnServer() {
  return cookies().get('sidebarExpanded')?.value as IsExpandedType;
}
