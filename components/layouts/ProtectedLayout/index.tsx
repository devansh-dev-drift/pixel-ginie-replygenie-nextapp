import { FC, ReactNode } from 'react';
import Sidebar from './Sidebar';

interface IProtectedLayoutProps {
    children: ReactNode;
}

export const ProtectedLayout: FC<IProtectedLayoutProps> = ({ children }) => {
    return (
        <div className='relative flex flex-col h-screen lg:overflow-hidden lg:flex-row'>
            <Sidebar />
            <div className='flex w-full bg-gradient-to-br from-[#080c15] via-[#1a1f30] to-[#1e2352] h-screen'>
                <main className='w-full overflow-y-auto overflow-hidden xl:px-22 px-4 xl:py-22 py-15'>
                    {children}
                </main>
            </div>
        </div>
    );
};
