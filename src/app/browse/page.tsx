import { Suspense } from 'react';
import { Loading } from '@/components/ui/Loading';
import { BrowseContent } from './BrowseContent';

export default function BrowsePage() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <BrowseContent />
    </Suspense>
  );
}
