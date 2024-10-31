'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { getDictionary } from '@/dictionaries';
import { Coins } from 'lucide-react';

import { usePathname, useRouter } from 'next/navigation';
import type { FC } from 'react';

type Props = {
  open: boolean;
  localizations: Awaited<ReturnType<typeof getDictionary>>['ModuleMenu']['crm'];
};

const CrmModuleMenu: FC<Props> = ({ open, localizations }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isPath = pathname.includes('crm');

  return (
    <div
      className={`mx-auto flex flex-row items-center p-2 ${
        isPath ? 'text-muted-foreground' : null
      }`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          className={
            open
              ? 'mx-auto w-full rounded-md hover:bg-slate-700 hover:text-gray-200 hover:transition hover:duration-150'
              : ''
          }
        >
          <div className="flex gap-2 p-2">
            <Coins />
            <span className={open ? '' : 'hidden'}>{localizations.title}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-10 w-[250px]">
          <DropdownMenuItem onClick={() => router.push('/crm/dashboard')}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/crm/dashboard/user')}>
            My Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/crm')}>
            Overview
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/crm/accounts')}>
            {localizations.accounts}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/crm/contacts')}>
            {localizations.contacts}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/crm/leads')}>
            {localizations.leads}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/crm/opportunities')}>
            {localizations.opportunities}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CrmModuleMenu;
