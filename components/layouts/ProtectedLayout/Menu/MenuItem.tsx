'use client';

import { IMenuItem } from '@/types/nav';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface IMenuItemProps {
    menuItem: IMenuItem;
    onCloseSidebar?: () => void;
}

const MenuItem: FC<IMenuItemProps> = ({ menuItem, onCloseSidebar }) => {
    const pathName = usePathname();
    const childrenHref = menuItem?.children?.map((it) => it.href);
    const isActive = pathName.includes(menuItem.href) || childrenHref?.includes(pathName);

    const handleClickNavItem = () => {
        onCloseSidebar && onCloseSidebar();
    };

    return (
        <>
            <div className='flex gap-4'>
                <Link
                    className='flex items-center cursor-pointer border-[#D2C4EB]'
                    href={menuItem.href}
                    onClick={handleClickNavItem}
                >
                    <Image
                        src={isActive ? menuItem.brandImg : menuItem.icon}
                        width={166}
                        height={42}
                        alt='Menu icon'
                        className='cursor-pointer'
                    />
                </Link>
            </div>
            {menuItem?.children !== undefined && isActive && (
                <div className='flex flex-col gap-2 pt-8'>
                    {menuItem?.children?.map((item: IMenuItem, index: number) => {
                        return (
                            <Link
                                key={index}
                                className={clsx(
                                    'flex items-center cursor-pointer p-3 rounded-md hover:bg-[#123d6a]', 
                                    pathName.includes(item.href) ? 'bg-[#123d6a] rounded-8 border-[0.5px] border-[#008CFC4D]': ''
                                )}
                                href={item.href}
                                onClick={handleClickNavItem}
                            >
                                <Image
                                    src={pathName.includes(item.href) ? item.activeIcon : item.icon}
                                    width={24}
                                    height={24}
                                    alt='Menu icon'
                                    className='cursor-pointer'
                                />
                                <p
                                    className={clsx(
                                        'text-xl ml-3 text-white font-lato font-medium',
                                    )}
                                >
                                    {item.label}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default MenuItem;
