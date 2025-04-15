import { ROUTES } from '@/config/routes';
import { parsePathnameWithQuery } from '@/lib/utils/parse-pathname-with-query';
import { redirect } from 'next/navigation';

export default async function Home({ searchParams }: { searchParams?: Promise<{ report_id: string }> }) {
  const awaitedSearchParams = await searchParams;
  return redirect(parsePathnameWithQuery(ROUTES.AI_SEARCH.INDEX, { report_id: awaitedSearchParams?.report_id ?? 1 }));
}
