'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const RightViewModalNoTrigger = ({
  title,
  description,
  children,
  open,
  setOpen,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_1000ms] data-[state=open]:animate-[dialog-overlay-show_1000ms]" />
        <Dialog.Content
          className={
            'fixed right-0 top-0 h-full overflow-hidden rounded-md border bg-white shadow-md data-[state=closed]:animate-[dialog-content-hide_1000ms] data-[state=open]:animate-[dialog-content-show_1000ms] dark:bg-slate-900'
          }
        >
          <div className="flex h-full flex-col">
            <div className="flex w-full justify-between">
              <Dialog.Title className="w-full p-3 font-semibold" asChild>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {title}
                </h4>
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
            <div className="flex justify-end p-3">
              <Dialog.Close className="" asChild>
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

export default RightViewModalNoTrigger;
