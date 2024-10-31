'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ModalDocumentView from '../ui/modal-document-view';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  document: any;
}

const InvoiceViewModal = ({
  isOpen,
  onClose,
  loading,
  document,
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (document.invoice_file_mimeType !== 'application/pdf') {
    return (
      <ModalDocumentView isOpen={isOpen} onClose={onClose}>
        <div className="flex h-full flex-col">
          {/*           <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            style={{ height: 800 }}
          /> */}
          This file can not be previewed.
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button disabled={loading} variant={'outline'} onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalDocumentView>
    );
  } else {
    return (
      <ModalDocumentView isOpen={isOpen} onClose={onClose}>
        <div className="flex h-full flex-col">
          <embed
            style={{
              width: '100%',
              height: '100%',
            }}
            type="application/pdf"
            src={document.document_file_url || document.invoice_file_url}
          />
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button disabled={loading} variant={'outline'} onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </ModalDocumentView>
    );
  }
};

export default InvoiceViewModal;
