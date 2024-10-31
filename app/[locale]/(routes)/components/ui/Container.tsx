import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React from 'react';

interface ContainerProps {
  title: string;
  description: string;
  visibility?: string;
  children: React.ReactNode;
}

const Container = ({
  title,
  description,
  visibility,
  children,
}: ContainerProps) => (
  <div className="h-full flex-1 space-y-4 overflow-hidden border-l p-8 pt-6">
    <Heading title={title} description={description} visibility={visibility} />
    <Separator />
    <div className="h-full space-y-5 overflow-auto pb-32 text-sm">
      {children}
    </div>
  </div>
);

export default Container;
