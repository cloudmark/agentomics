
'use client';

import dynamic from 'next/dynamic';

const BackgroundAnimation = dynamic(
  () => import('@/components/background-animation').then((mod) => mod.BackgroundAnimation),
  {
    ssr: false,
    loading: () => <div className="fixed top-0 left-0 w-full h-full bg-background -z-10" />,
  }
);

export function ClientBackground() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <BackgroundAnimation />
        </div>
    )
}
