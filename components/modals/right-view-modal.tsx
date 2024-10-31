'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

type Props = {
  label?: string;
  title: string;
  description: string;
  width?: string;
  children: ReactNode;
  buttonVariant?:
    | 'link'
    | 'default'
    | 'outline'
    | 'destructive'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
};

const RightViewModal = ({
  label,
  title,
  description,
  width,
  children,
  buttonVariant,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="mb-5" variant={buttonVariant}>
          {label}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_1000ms] data-[state=open]:animate-[dialog-overlay-show_1000ms]" />
        <Dialog.Content
          className={
            'fixed right-0 top-0 h-full overflow-hidden rounded-md border bg-white shadow-md data-[state=closed]:animate-[dialog-content-hide_1000ms] data-[state=open]:animate-[dialog-content-show_1000ms] dark:bg-slate-900'
          }
        >
          <div className={`flex h-full flex-col ${width}`}>
            <div className="flex w-full justify-between">
              <Dialog.Title className="w-full p-3 font-semibold">
                <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {title}
                </span>
              </Dialog.Title>
              <Dialog.Close className="flex w-full justify-end pr-5 pt-5 text-right">
                <Cross1Icon className="h-5 w-5 opacity-50 hover:opacity-100" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="overflow-auto p-3 text-slate-400 opacity-75">
              {description}
            </Dialog.Description>
            <div className="h-full w-full flex-grow overflow-auto border p-5">
              {children}
            </div>
            <div className="flex w-full justify-end p-3">
              {' '}
              <Dialog.Close asChild>
                <Button variant={'destructive'} onClick={() => setOpen(false)}>
                  Close
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RightViewModal;
