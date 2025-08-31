'use client';

import clsx from 'clsx';
import { Locale } from 'next-intl';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

type Props = {
    children: ReactNode;
    defaultValue: string;
};

export default function LocaleSwitcherSelect({ children, defaultValue }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value as Locale;
        startTransition(() => {
            router.replace(pathname,  { locale: nextLocale });

        });
    }

    return (
        <label className="relative inline-block">
            <select
                className={clsx(
                    'appearance-none bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold uppercase py-2 px-4 pr-10 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 cursor-pointer',
                    isPending && 'opacity-50 cursor-not-allowed'
                )}
                defaultValue={defaultValue}
                disabled={isPending}
                onChange={onSelectChange}
            >
                {children}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-300" />
        </label>
    );
}
