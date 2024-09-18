'use client';

import dynamic from 'next/dynamic';

const SetVerify = dynamic(() => import('@/containers/verify'), { ssr: false });

const SetVerifyPage = () => {
    return <SetVerify />;
};

export default SetVerifyPage;