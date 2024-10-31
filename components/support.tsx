import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

const SupportComponent = () => (
  <Popover>
    <PopoverTrigger className="rounded-md border p-3">
      <HelpCircle className="h-4 w-4 cursor-pointer" />
    </PopoverTrigger>
    <PopoverContent
      className="mt-3 flex min-w-[400px] flex-col space-y-2"
      align={'end'}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-sm">Need help? Join us on</span>
        <Button asChild variant={'secondary'}>
          <Link
            className="rounded-md border p-2"
            href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || '#'}
            target="_blank"
          >
            <DiscordLogoIcon />
          </Link>
        </Button>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-sm"> Find a bug? Create an issue on</span>
        <Button asChild variant={'secondary'}>
          <Link
            className="rounded-md border p-2"
            href={process.env.NEXT_PUBLIC_GITHUB_ISSUES_URL || '#'}
            target="_blank"
          >
            <GitHubLogoIcon />
          </Link>
        </Button>
      </div>
    </PopoverContent>
  </Popover>
);

export default SupportComponent;
