'use client';

import { MessagesSquare } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const InvoiceChat = () => (
  <Sheet>
    <SheetTrigger asChild>
      <MessagesSquare className="m-2 h-6 w-6 cursor-pointer" />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Invoice conversation</SheetTitle>
      </SheetHeader>
      content here - in progress
    </SheetContent>
  </Sheet>
);

export default InvoiceChat;
