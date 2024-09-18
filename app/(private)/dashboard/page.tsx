'use client';

import dynamic from 'next/dynamic';

const DashBoard = dynamic(() => import('@/containers/list'));

const DashBoardPage = () => {
    return <DashBoard />;
};

export default DashBoardPage;
