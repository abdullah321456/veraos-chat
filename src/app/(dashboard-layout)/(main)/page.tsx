import { ROUTES } from '@/config/routes';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Redirect to AI Search without any query parameters to avoid navigation conflicts
  return redirect(ROUTES.AI_SEARCH.INDEX);
}
