import { cookies } from "next/headers";
import { IsExpandedType } from "../hooks/use-sidebar-expand";

export function getIsSidebarExpandedOnServer() {
  // Always default to collapsed (true = 76px collapsed, false = 200px expanded)
  // Note: The logic is inverted - true means collapsed, false means expanded
  return 'true' as IsExpandedType;
}
