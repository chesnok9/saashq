import type { ReactNode } from 'react';

const H4Title = ({ children }: { children: ReactNode }) => (
  <h4 className="scroll-m-20 py-5 text-xl font-semibold tracking-tight">
    {children}
  </h4>
);

export default H4Title;
