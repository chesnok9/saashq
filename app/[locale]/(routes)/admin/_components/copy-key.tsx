'use client';

import React from 'react';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

const CopyKeyComponent = ({
  keyValue,
  envValue,
  message,
}: {
  keyValue?: string;
  envValue?: string;
  message: string;
}) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(message + ' - ' + 'copied to clipboard');
  };

  return (
    <p
      className="flex items-center gap-2"
      onClick={() => onCopy(keyValue || '')}
    >
      {keyValue ? keyValue : envValue ? envValue : 'Not set'}
      <Copy className="h-4 w-4" />
    </p>
  );
};

export default CopyKeyComponent;
